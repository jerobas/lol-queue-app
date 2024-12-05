const fs = require("fs");
const axios = require("axios");
const { GamePhase } = require("../constants");

global.name = null;
global.pid = null;
global.port = null;
global.password = null;
global.protocol = null;

const getLockFileInfo = async () => {
  try {
    const module = await import("./findLockfile.mjs");
    const data = await module.readLockfile();
    if (!data) return false;

    [global.name, global.pid, global.port, global.password, global.protocol] =
      data.split(":");
  } catch (error) {
    console.error(error);
  }
};

const createLolClient = () => {
  const api = axios.create({
    baseURL: `https://127.0.0.1:${global.port}`,
    headers: {
      Authorization: `Basic ${Buffer.from(`riot:${global.password}`).toString(
        "base64"
      )}`,
      "Content-Type": "application/json",
    },
    httpsAgent: new (require("https").Agent)({
      rejectUnauthorized: false,
    }),
  });

  return api;
};

const checkPlayerPhase = async (api) => {
  try {
    let response = await api.get("/lol-gameflow/v1/session");
    if (
      response.message === GamePhase.NOTOK || // when in the menu
      response.data.phase === GamePhase.LOBBY || // when in the lobby without searching
      response.data.phase === GamePhase.MATCHMAKING || // searching for a match
      response.data.phase === GamePhase.READYCHECK // ready to accept
    ) {
      // Player is not in a match.
      return {
        status: false,
        phase: response.message ? GamePhase.MENU : response.data.phase,
      };
    } else {
      // Player is in a match
      return { status: true, phase: GamePhase.INGAME, gameData: response.data.gameData };
    }
  } catch (error) {
    return {
      status: false,
      phase: "You are not able to accept a queue",
    };
  }
};

const acceptMatch = async (api) => {
  try {
    await api.post("/lol-matchmaking/v1/ready-check/accept");
    console.log("Accepted");
  } catch (error) {
    console.error("Error accepting match:", error.message);
  }
};

const getPlayerInfo = async (api) => {
  try {
    const response = await api.get("/lol-summoner/v1/current-summoner");
    return {
      id: response.data.summonerId,
      name: response.data.displayName,
      level: response.data.summonerLevel,
      profileIconId: response.data.profileIconId,
    };
  } catch (error) {
    console.error("Error fetching player info:", error.message);
    return null;
  }
};

const handleAccept = async (api) => {
  try {
    let state = await checkPlayerPhase(api);
    if (state.phase === GamePhase.INGAME) {
      return state;
    } else if (state.phase === GamePhase.READYCHECK) {
      const response = await api.get("/lol-matchmaking/v1/ready-check");
      if (response.state === GamePhase.INPROGRESS) {
        await acceptMatch(api);
        return state;
      }
      return state;
    } else {
      return state;
    }
  } catch (error) {
    console.log(error.message);
  }
  return true;
};

module.exports = {
  getLockFileInfo,
  createLolClient,
  handleAccept,
  checkPlayerPhase,
  getPlayerInfo
};
