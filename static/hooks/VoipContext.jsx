import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import { useToast } from "./ToastContext";
import { useGame } from "./GameContext";

const VoipContext = createContext();

export const useVoip = () => useContext(VoipContext);

export const VoipProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [users, setUsers] = useState([]);
  const [audioStreams, setAudioStreams] = useState();
  const [muteStates, setMuteStates] = useState({});
  const [peerId, setPeerId] = useState(null);
  const myAudioRef = useRef(null);
  const peerInstanceRef = useRef(null);
  const socketRef = useRef(null);
  const notify = useToast();
  const { teams } = useGame();

  useEffect(() => {
    const socket = io(
      "http://ec2-15-229-78-33.sa-east-1.compute.amazonaws.com:3001",
      {
        autoConnect: false,
      }
    );

    const peer = new Peer(undefined, {
      host: "ec2-15-229-78-33.sa-east-1.compute.amazonaws.com",
      port: 3002,
      path: "peerjs",
    });

    socket.connect();
    socketRef.current = socket;
    peerInstanceRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        call.answer(stream);
        call.on("stream", (userStream) => {
          addAudioStream(call.metadata.playerName, userStream);
        });
      });
    });

    return () => {
      peer.disconnect();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (peerId && joinedRoom) {
      socketRef.current.on("userJoined", (players) => {
        const updatedPlayers = players.map((player) => {
          const matchingPlayer = [...teams.teamOne, ...teams.teamTwo].find(
            (teamPlayer) => teamPlayer.summonerInternalName === player.name
          );

          return {
            ...player,
            iconUrl: matchingPlayer ? matchingPlayer.iconUrl : null,
          };
        });
        setUsers(updatedPlayers);
        connectToUsers(updatedPlayers);
      });
    }
  }, [peerId, joinedRoom]);

  const connectToUsers = useCallback(
    (players) => {
      for (let player of players) {
        if (player.peerId !== peerId) {
          const call = peerInstanceRef.current.call(
            player.peerId,
            myAudioRef.current,
            {
              metadata: player.name,
            }
          );
          call.on("stream", (userStream) => {
            addAudioStream(player.name, userStream);
          });

          call.on("close", () => {
            removeAudioStream(player.name);
          });
        }
      }
    },
    [peerId]
  );

  const joinRoom = useCallback(() => {
    if (!roomId || !playerName)
      return notify.warning("Ocorreu um erro ao entrar na call");

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      myAudioRef.current = stream;
      socketRef.current.emit("joinRoom", { roomId, playerName, peerId });
      setJoinedRoom(true);
    });
  }, [roomId, playerName, peerId]);

  const leaveRoom = useCallback(() => {
    socketRef.current.emit("leaveRoom", { roomId, playerName });

    if (myAudioRef.current) {
      myAudioRef.current.getTracks().forEach((track) => track.stop());
      myAudioRef.current = null;
    }

    if (peerInstanceRef.current) {
      Object.values(peerInstanceRef.current.connections).forEach(
        (connectionArray) => {
          connectionArray.forEach((connection) => {
            if (connection.close) connection.close();
          });
        }
      );
      peerInstanceRef.current.disconnect();
    }

    setAudioStreams();
    setMuteStates({});
    setUsers([]);
    setJoinedRoom(false);

    notify.success("O jogo terminou, vaza!");
  }, [roomId, playerName]);

  const addAudioStream = useCallback((name, stream) => {
    if (name) setAudioStreams((prev) => ({ ...prev, [name]: stream }));
  }, []);

  const removeAudioStream = useCallback((name) => {
    setAudioStreams((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }, []);

  const toggleMute = useCallback(
    (targetPlayerName) => {
      if (targetPlayerName === playerName) {
        const isMuted = !myAudioRef.current.getAudioTracks()[0].enabled;
        myAudioRef.current.getAudioTracks().forEach((track) => {
          track.enabled = isMuted;
        });
        setMuteStates((prev) => ({
          ...prev,
          [playerName]: !isMuted,
        }));
      } else {
        const stream = audioStreams[targetPlayerName];
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
        setRoomId,
        setPlayerName,
        joinedRoom,
        joinRoom,
        users,
        audioStreams,
        muteStates,
        toggleMute,
        myAudioRef,
        leaveRoom,
      }}
    >
      {children}
    </VoipContext.Provider>
  );
};
