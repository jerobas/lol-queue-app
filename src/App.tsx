import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { ToastProvider } from "./context/toastContext";
import { GameProvider } from "./context/gameContext";
import { routes } from "./pages";
import { Suspense } from "react";
import TitleBar from "./components/titlebar";
import { VoipProvider } from "./context/voipContext";
import { AudioInputProvider } from "./context/audioContext";

function App() {
  return (
    <ToastProvider>
      <AudioInputProvider>
        <GameProvider>
          <VoipProvider>
            <TitleBar />
            <Sidebar routes={routes}>
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-screen">
                    Loading...
                  </div>
                }
              >
                <Routes>
                  {Object.entries(routes).map(([name, route]) => (
                    <Route
                      key={name}
                      path={name === "home" ? "/" : `/${name}`}
                      element={route["index"]}
                    />
                  ))}
                </Routes>
              </Suspense>
            </Sidebar>
          </VoipProvider>
        </GameProvider>
      </AudioInputProvider>
    </ToastProvider>
  );
}

export default App;
