import { ToastOptions } from "react-toastify";

const BASE_URL = "ec2-15-229-78-33.sa-east-1.compute.amazonaws.com";

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
  LOBBY = "lobby.png",
  INGAME = "in-game.png",
  MENU = "menu.png",
  QUEUE = "queue.png",
}

export enum AWS {
  SOCKET = `http://${BASE_URL}:3001`,
  PEER = BASE_URL,
  PERR_PORT = 3002,
  PATH = "peerjs",
}

export enum IpcMethod {
  GET = "lol-api:get",
  POST = "lol-api:post",
  MINIMIZE = "window:minimize",
  CLOSE = "window:close"
}

export interface ToastNotify
  extends Record<
    "success" | "error" | "info" | "warning" | "custom",
    (message: string, options?: ToastOptions) => void
  > {}

export interface Page {
  [key: string]: React.ReactElement;
}

export interface Pages {
  [key: string]: Page;
}
