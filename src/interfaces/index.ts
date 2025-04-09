import { ReactNode } from "react";
import { ToastOptions } from "react-toastify";

const BASE_URL = "ec2-15-228-45-137.sa-east-1.compute.amazonaws.com";

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
  peerId: string;
  summonerId: string;
  iconUrl?: string | null;
}

export interface VoipContextType {
  roomId: string;
  playerName: string;
  summonerId: string;
  showVoip: boolean;
  setRoomId: (id: string) => void;
  setShowVoip: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerName: (name: string) => void;
  setSummonerId: (name: string) => void;
  joinedRoom: boolean;
  joinRoom: () => void;
  leaveRoom: () => void;
  users: IPlayer[];
  audioStreams?: Record<string, MediaStream>;
  muteStates: Record<string, boolean>;
  toggleMute: (targetPlayerName: string) => void;
  myAudioRef: React.MutableRefObject<MediaStream | null>;
}

interface TeamPlayer {
  iconUrl: string;
  [key: string]: any;
}

export interface GameProviderProps {
  children: ReactNode;
}
export interface BurgerButtonProps {
  sidebarState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export interface Teams {
  teamOne: TeamPlayer[];
  teamTwo: TeamPlayer[];
}

export interface GameContextType {
  teams?: Teams;
  setTeams: React.Dispatch<React.SetStateAction<Teams | undefined>>;
  data?: ISession;
  setData: React.Dispatch<React.SetStateAction<ISession | undefined>>;
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
  END = "EndOfGame",
  CHAMPSELECT = "ChampSelect",
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
  CLOSE = "window:close",
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

export interface VoipProviderProps {
  children: ReactNode;
}
