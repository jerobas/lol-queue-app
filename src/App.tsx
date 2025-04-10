import Sidebar from "./components/sidebar";
import RoutesHandler, { routes } from "./pages";
import TitleBar from "./components/titlebar";
import AppWrapper from "./AppWrapper";

function App() {
  return (
    <AppWrapper>
      <TitleBar />
      <Sidebar routes={routes}>
        <RoutesHandler />
      </Sidebar>
    </AppWrapper>
  );
}

export default App;