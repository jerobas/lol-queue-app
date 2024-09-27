const fs = require("fs");
const path = require("path");
const axios = require("axios");

global.name = null;
global.pid = null;
global.port = null;
global.password = null;
global.protocol = null;

const getLockFileInfo = () => {
  const data = fs.readFileSync(
    path.join("C:", "Riot Games", "League of Legends", "lockfile"),
    "utf8"
  );

  [
    global.name,
    global.pid,
    global.port,
    global.password,
    global.protocol,
  ] = data.split(":");
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
      response.message === "No gameflow session exists." || // when in the menu
      response.data.phase === "Lobby" || // when in the lobby without searching
      response.data.phase === "Matchmaking" || // searching for a match
      response.data.phase === "ReadyCheck" // ready to accept
    ) {
      // Player is not in a match.
      return {
        status: false,
        phase: response.message ? "Menu" : response.data.phase,
      };
    } else {
      // Player is in a match
      return { status: true, phase: "InGame" };
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

const handleAccept = async (api) => {
  try {
    let state = await checkPlayerPhase(api);
    if (state.phase === "InGame") {
      return state;
    } else if (state.phase === "ReadyCheck") {
      const response = await api.get("/lol-matchmaking/v1/ready-check");
      if (response.state === "InProgress") {
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
};
