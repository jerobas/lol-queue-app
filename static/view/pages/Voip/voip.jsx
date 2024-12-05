import React, { useEffect, useState } from "react";
import { useVoip } from "../../../hooks/VoipContext";
import { useGame } from "../../../hooks/GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const Voip = ({ eventSource }) => {
  const {
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
  } = useVoip();

  const [loading_, setLoading] = useState(true);
  const { setTeams, teams } = useGame();
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    eventSource.onmessage = (event) => {
      if (
        JSON.parse(event.data).phase &&
        JSON.parse(event.data).phase == "InGame"
      ) {
        const data = JSON.parse(event.data).message;
        const isT1 = data?.teamOne.some(
          (player) =>
            player.summonerId === JSON.parse(event.data).localPlayer.id
        );
        const t1 = data?.teamOne.map((player) => {
          const championSelection = data?.playerChampionSelections.find(
            (champion) =>
              champion.summonerInternalName === player.summonerInternalName
          );

          return {
            ...player,
            championId: championSelection?.championId,
          };
        });
        const t2 = data?.teamTwo.map((player) => {
          const championSelection = data?.playerChampionSelections.find(
            (champion) =>
              champion.summonerInternalName === player.summonerInternalName
          );

          return {
            ...player,
            championId: championSelection?.championId,
          };
        });
        setRoomId(`${data?.gameId}${isT1 ? "T1" : "T2"}`);
        setTeams({ teamOne: t1, teamTwo: t2 });
        setPlayerName(JSON.parse(event.data).localPlayer.name);
        setLoading(false);
      } else if (
        JSON.parse(event.data).phase &&
        JSON.parse(event.data).phase == "WaitingForStats"
      ) {
        setLoading(true);
        leaveRoom();
      }
    };
  }, [eventSource]);

  useEffect(() => {
    if (teams && !iconsLoaded) {
      const updateTeamsWithIcons = async () => {
        try {
          const updatedTeams = { teamOne: [], teamTwo: [] };

          const findById = async (championId) => {
            const versionUrl =
              "https://ddragon.leagueoflegends.com/api/versions.json";
            const championsUrl =
              "https://ddragon.leagueoflegends.com/cdn/<VERSION>/data/en_US/champion.json";

            const versions = await fetch(versionUrl).then((res) => res.json());
            const latestVersion = versions[0];

            const champions = await fetch(
              championsUrl.replace("<VERSION>", latestVersion)
            ).then((res) => res.json());

            const champion = Object.values(champions.data).find(
              (champ) => champ.key === String(championId)
            );

            if (!champion) {
              console.error(`Champion with ID ${championId} not found`);
              return null;
            }

            return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.id}.png`;
          };

          for (const player of teams.teamOne) {
            const iconUrl = await findById(player.championId);
            updatedTeams.teamOne.push({ ...player, iconUrl });
          }

          for (const player of teams.teamTwo) {
            const iconUrl = await findById(player.championId);
            updatedTeams.teamTwo.push({ ...player, iconUrl });
          }

          setTeams(updatedTeams);
          setIconsLoaded(true);
        } catch (err) {
          console.error("Error updating team icons: ", err);
        }
      };

      updateTeamsWithIcons();
    }
  }, [teams, iconsLoaded, setTeams]);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        WebkitAppRegion: "no-drag",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!joinedRoom && !loading_ ? (
        <button
          onClick={joinRoom}
          style={{
            padding: "12px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          Entrar em Call
        </button>
      ) : (
        <div>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              maxWidth: "400px",
              margin: "20px auto",
              textAlign: "left",
            }}
          >
            {users.map((user) => (
              <li
                key={user.id}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {user?.iconUrl && (
                    <img
                      src={user?.iconUrl}
                      alt={`${user.name} icon`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  )}
                  {user.name}
                </div>
                <button
                  onClick={() => toggleMute(user.name)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      muteStates[user.name] ? faMicrophoneSlash : faMicrophone
                    }
                    style={{
                      fontSize: "18px",
                      color: muteStates[user.name] ? "#e74c3c" : "#2ecc71",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <audio
              ref={(ref) => {
                if (ref && myAudioRef.current) {
                  ref.srcObject = myAudioRef.current;
                }
              }}
              muted
              autoPlay
              style={{
                width: "150px",
                height: "40px",
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
                      style={{
                        width: "150px",
                        height: "40px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      }}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voip;
