import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { routes } from "./pages";
import { Suspense } from "react";
import TitleBar from "./components/titlebar";
import ContextHolder from "./context";
import useUpdater from "./hooks/useUpdater";
import Download from "./components/download";

function App() {
  const [checkingUpdate, processMessage] = useUpdater();

  return (
    <ContextHolder>
      {
        checkingUpdate ? (
          <Download message={processMessage} />
        ) : <>
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
        </>
      }
    </ContextHolder>
  );
}

export default App;