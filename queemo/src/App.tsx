import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Sidebar from "./components/sidebar";
import { ToastProvider } from "./context/toastContext";
import Voip from "./pages/voip";

function App() {
  return (
    <ToastProvider>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voip" element={<Voip />} />
        </Routes>
      </Sidebar>
    </ToastProvider>
  );
}

export default App;
