// @ts-nocheck

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import io, { Socket } from "socket.io-client";
import Peer, { MediaConnection } from "peerjs";
import { useToast } from "./toastContext";
import { useGame } from "./gameContext";
import {
  AWS,
  IPlayer,
  VoipContextType,
  VoipProviderProps,
} from "../interfaces";
import { useAudioInput } from "./audioContext";

const VoipContext = createContext<VoipContextType>({} as VoipContextType);

export const useVoip = () => useContext(VoipContext);

export const VoipProvider = ({ children }: VoipProviderProps) => {
  const [roomId, setRoomId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [summonerId, setSummonerId] = useState<string>("");
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const [showVoip, setShowVoip] = useState<boolean>(false);
  const [users, setUsers] = useState<IPlayer[]>([]);
  const [audioStreams, setAudioStreams] =
    useState<Record<string, MediaStream>>();
  const [muteStates, setMuteStates] = useState<Record<string, boolean>>({});
  const [peerId, setPeerId] = useState<string | null>(null);

  const myAudioRef = useRef<MediaStream | null>(null);
  const peerInstanceRef = useRef<Peer | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const notify = useToast();
  const { teams } = useGame();
  const { selectedDeviceId } = useAudioInput();

  useEffect(() => {
    const socket = io(AWS.SOCKET, {
      autoConnect: false,
    });

    const peer = new Peer(undefined, {
      host: AWS.PEER,
      port: AWS.PERR_PORT,
      path: AWS.PATH,
    });

    socket.connect();
    socketRef.current = socket;
    peerInstanceRef.current = peer;

    peer.on("open", (id: string) => {
      setPeerId(id);
    });

    peer.on("call", (call: MediaConnection) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: selectedDeviceId
            ? { deviceId: { exact: selectedDeviceId } }
            : true,
        })
        .then((stream) => {
          call.answer(stream);
          call.on("stream", (userStream: MediaStream) => {
            addAudioStream(call.metadata.playerName, userStream);
          });
        });
    });

    return () => {
      peer.disconnect();
      socket.disconnect();
    };
  }, [selectedDeviceId]);

  useEffect(() => {
    if (peerId && joinedRoom) {
      socketRef.current?.on("userJoined", (players: IPlayer[]) => {
        const updatedPlayers = players.map((player) => {
          const matchingPlayer = [...teams.teamOne, ...teams.teamTwo].find(
            (teamPlayer) => teamPlayer.summonerId === player.summonerId
          );

          return {
            ...player,
            iconUrl: matchingPlayer ? matchingPlayer.championIcon : null,
          };
        });

        const uniquePlayers = Array.from(
          new Map(updatedPlayers.map((p) => [p.summonerId, p])).values()
        );

        setUsers(uniquePlayers);
        connectToUsers(uniquePlayers);
      });
    }
  }, [peerId, joinedRoom]);

  useEffect(() => {
    socketRef.current?.on("playerDisconnected", (summonerId: string) => {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.summonerId !== summonerId)
      );
      const disconnectedUser = users.find(
        (user) => user.summonerId === summonerId
      );

      if (disconnectedUser) {
        removeAudioStream(disconnectedUser.name);
      }
    });
  }, [users]);

  const connectToUsers = useCallback(
    (players: IPlayer[]) => {
      for (const player of players) {
        if (player.peerId !== peerId) {
          const call = peerInstanceRef.current?.call(
            player.peerId,
            myAudioRef.current!,
            {
              metadata: { playerName },
            }
          );
          call?.on("stream", (userStream: MediaStream) => {
            addAudioStream(player.name, userStream);
          });

          call?.on("close", () => {
            removeAudioStream(player.name);
          });
        }
      }
    },
    [peerId, playerName]
  );

  const joinRoom = useCallback(() => {
    if (!roomId || !playerName)
      return notify.warning("Ocorreu um erro ao entrar na call");

    navigator.mediaDevices
      .getUserMedia({
        audio: selectedDeviceId
          ? { deviceId: { exact: selectedDeviceId } }
          : true,
      })
      .then((stream) => {
        myAudioRef.current = stream;
        socketRef.current?.emit("joinRoom", {
          roomId,
          playerName,
          peerId,
          summonerId,
        });
        setJoinedRoom(true);
      });
  }, [roomId, playerName, peerId, notify, summonerId, selectedDeviceId]);

  const leaveRoom = useCallback(() => {
    socketRef.current?.emit("leaveRoom", { roomId, playerName });

    if (myAudioRef.current) {
      myAudioRef.current.getTracks().forEach((track) => track.stop());
      myAudioRef.current = null;
    }

    if (peerInstanceRef.current) {
      Object.values(peerInstanceRef.current.connections).forEach(
        (connectionArray) => {
          connectionArray.forEach((connection: any) => {
            if (connection.close) connection.close();
          });
        }
      );
      peerInstanceRef.current.disconnect();
    }

    setAudioStreams(undefined);
    setMuteStates({});
    setUsers([]);
    setJoinedRoom(false);

    notify.success("O jogo terminou, vaza!");
  }, [roomId, playerName, notify]);

  const addAudioStream = useCallback((name: string, stream: MediaStream) => {
    if (name)
      setAudioStreams((prev) => ({
        ...prev,
        [name]: stream,
      }));
  }, []);

  const removeAudioStream = useCallback((name: string) => {
    setAudioStreams((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }, []);

  const toggleMute = useCallback(
    (targetPlayerName: string) => {
      if (targetPlayerName === playerName) {
        const isMuted = !myAudioRef.current?.getAudioTracks()[0].enabled;
        myAudioRef.current?.getAudioTracks().forEach((track) => {
          track.enabled = isMuted!;
        });
        setMuteStates((prev) => ({
          ...prev,
          [playerName]: !isMuted!,
        }));
      } else {
        const stream = audioStreams?.[targetPlayerName];
        if (stream instanceof MediaStream) {
          const audioElement = Array.from(
            document.querySelectorAll("audio")
          ).find((audio) => audio.srcObject === stream);

          if (audioElement) {
            const isMuted = !audioElement.muted;
            audioElement.muted = isMuted;
            setMuteStates((prev) => ({
              ...prev,
              [targetPlayerName]: isMuted,
            }));
          }
        }
      }
    },
    [audioStreams, playerName]
  );

  return (
    <VoipContext.Provider
      value={{
        roomId,
        playerName,
        summonerId,
        setSummonerId,
        setRoomId,
        setPlayerName,
        joinedRoom,
        joinRoom,
        leaveRoom,
        users,
        audioStreams,
        muteStates,
        toggleMute,
        myAudioRef,
        showVoip,
        setShowVoip,
      }}
    >
      {children}
    </VoipContext.Provider>
  );
};
