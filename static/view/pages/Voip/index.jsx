import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import React from "react";

const Voip = () => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [users, setUsers] = useState([]);
  const [audioStreams, setAudioStreams] = useState();
  const [muteStates, setMuteStates] = useState({});
  const myAudioRef = useRef(null);
  const [peerId, setPeerId] = useState(null);
  const peerInstanceRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(
      "http://ec2-15-229-78-33.sa-east-1.compute.amazonaws.com:3001"
    );
    socketRef.current = socket;

    const peer = new Peer(undefined, {
      host: "ec2-15-229-78-33.sa-east-1.compute.amazonaws.com",
      port: 3002,
      path: "peerjs",
    });

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
    if (peerId) {
      socketRef.current.on("userJoined", (players) => {
        setUsers(players);

        for (let player of players) {
          if (player.peerId != peerId) {
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
      });
    }
  }, [peerId]);

  const joinRoom = () => {
    if (!roomId || !playerName) return alert("Preencha todos os campos!");

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      myAudioRef.current = stream;

      socketRef.current.emit("joinRoom", { roomId, playerName, peerId });
      setJoinedRoom(true);
    });
  };

  const addAudioStream = (playerName, userStream) => {
    if (playerName) {
      setAudioStreams((prev) => ({
        ...prev,
        [playerName]: userStream,
      }));
    }
  };

  const removeAudioStream = (playerName) => {
    setAudioStreams((prev) => {
      const updated = { ...prev };
      delete updated[playerName];
      return updated;
    });
  };

  const toggleMute = (targetPlayerName) => {
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
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", WebkitAppRegion: "no-drag" }}>
      {!joinedRoom ? (
        <div>
          <h1>Entre em uma Sala</h1>
          <input
            type="text"
            placeholder="Nome da Sala"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "300px" }}
          />
          <br />
          <input
            type="text"
            placeholder="Seu Nome"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "300px" }}
          />
          <br />
          <button
            onClick={joinRoom}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Entrar na Sala
          </button>
        </div>
      ) : (
        <div>
          <h1>Você está na sala: {roomId}</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id} style={{ margin: "10px 0" }}>
                {user.name}
                <button
                  onClick={() => toggleMute(user.name)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: muteStates[user.name]
                      ? "#4CAF50"
                      : "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  {muteStates[user.name] ? "unmute" : "mute"}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <audio
              ref={(ref) => {
                if (ref && myAudioRef.current) {
                  ref.srcObject = myAudioRef.current;
                }
              }}
              muted
              controls
              autoPlay
              style={{
                margin: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            />
            {audioStreams &&
              Object.keys(audioStreams).map((playerName) => {
                const stream = audioStreams[playerName];
                if (stream instanceof MediaStream) {
                  return (
                    <audio
                      key={playerName}
                      ref={(ref) => {
                        if (ref) {
                          ref.srcObject = stream;
                        }
                      }}
                      autoPlay
                      controls
                      style={{
                        margin: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      }}
                    />
                  );
                }
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voip;
