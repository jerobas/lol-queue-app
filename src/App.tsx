import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { routes } from "./pages";
import { Suspense } from "react";
import TitleBar from "./components/titlebar";
import ContextHolder from "./context";

function App() {
  return (
    <ContextHolder>
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
    </ContextHolder>
  );
}

export default App;
