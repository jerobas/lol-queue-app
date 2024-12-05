const path = require("path");

const deepFreeze = (obj) => {
  const propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach((name) => {
    const prop = obj[name];

    if (typeof prop === "object" && prop !== null) {
      deepFreeze(prop);
    }
  });

  return Object.freeze(obj);
};

const GamePhase = deepFreeze({
  LOBBY: "Lobby",
  MATCHMAKING: "Matchmaking",
  READYCHECK: "ReadyCheck",
  INGAME: "InGame",
  NOTOK: "No gameflow session exists.",
  MENU: "Menu",
  INPROGRESS: "InProgress",
  POSTGAME: "WaitingForStats",
  RECONNECT: "Reconnect",
});

const packageJson = require(path.join(__dirname, "..", "..", "package.json"));
const version = deepFreeze({
  stable: packageJson.version,
  message: "Theres a new version avalible to download",
});

module.exports = { GamePhase, version };
