import { ToastProvider } from "./toastContext";
import { GameProvider } from "./gameContext";
import { VoipProvider } from "./voipContext";
import { AudioInputProvider } from "./audioContext";
import SessionWatcher from "../components/sessionWatcher";

const ContextHolder = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <AudioInputProvider>
        <GameProvider>
          <VoipProvider>
            <SessionWatcher />
            {children}
          </VoipProvider>
        </GameProvider>
      </AudioInputProvider>
    </ToastProvider>
  );
};

export default ContextHolder;
