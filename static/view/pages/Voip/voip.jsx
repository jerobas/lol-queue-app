import React from "react";
import { useVoip } from "../../../../src/hooks/index";

const Voip = () => {
  const {
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
  } = useVoip();

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        WebkitAppRegion: "no-drag",
      }}
    >
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
            //   controls
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
                    //   controls
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
