import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { ToastProvider } from "./context/toastContext";
import { routes } from "./pages";
import { Suspense } from "react";

function App() {
  return (
    <ToastProvider>
      <Sidebar routes={routes}>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            {Object.entries(routes).map(([name, route]) => (
              <Route key={name} path={name === 'home' ? '/' : `/${name}`} element={route["index"]} />
            ))}
          </Routes>
        </Suspense>
      </Sidebar>
    </ToastProvider>
  );
}

export default App;