import { ToastOptions } from "react-toastify";

export interface ISession {
  gameData: {
    gameId: number;
    isCustomGame: boolean;
    gameName?: string;
    queue: {
      description: string;
      detailedDescription: string;
    };
    teamOne: [];
    teamTwo: [];
  };
  phase: string;
  error?: string;
}

export interface IPlayer {
  name: string;
  accountId: number;
  summonerId: number;
  level: number;
}

export enum GamePhase {
  LOBBY = "Lobby",
  MATCHMAKING = "Matchmaking",
  READYCHECK = "ReadyCheck",
  INGAME = "InGame",
  NOTOK = "No gameflow session exists.",
  MENU = "Menu",
  INPROGRESS = "InProgress",
  POSTGAME = "WaitingForStats",
  RECONNECT = "Reconnect",
  ERRORMENU = "Request failed with status code 404",
}

export enum Routes {
  PLAYER = "/lol-summoner/v1/current-summoner",
  SESSION = "/lol-gameflow/v1/session",
  ACCEPT = "/lol-matchmaking/v1/ready-check/accept",
  READYCHECK = "/lol-matchmaking/v1/ready-check",
}

export enum Images {
  LOBBY = "src/assets/lobby.png",
  INGAME = "src/assets/in-game.png",
  MENU = "src/assets/menu.png",
  QUEUE = "src/assets/queue.png"
}

export enum IpcMethod {
  GET = "lol-api:get",
  POST = "lol-api:post",
}

export interface ToastNotify
  extends Record<
    "success" | "error" | "info" | "warning" | "custom",
    (message: string, options?: ToastOptions) => void
  > {}
