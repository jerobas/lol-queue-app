import React, { useEffect, useState } from "react";
import CommonTemplate from "./templates/Common";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import sse from "../utils/sse";
import Voip from "./pages/Voip/voip";
import { VoipProvider } from "../../src/hooks";

const PAGES = {
    home: { component: Home, icon: "fa-solid fa-home", name: "home" },
    settings: { component: Settings, icon: "fa-solid fa-gear", name: "settings" },
    voip: { component: Voip, icon: "fa-solid fa-phone", name: "voip" },
};

const App = () => {
    const [currentPage, setCurrentPage] = useState("home");
    const eventSource = sse();

    const renderPage = (page) => {
        const PageComponent = PAGES[page]?.component || Home;
        return <PageComponent eventSource={eventSource} />;
    };

    useEffect(() => {
        // Perform any necessary setup, such as connecting the event source
        return () => {
            eventSource.close();
        };
    }, [eventSource]);

    return <VoipProvider><CommonTemplate goToPage={setCurrentPage} pagesDict={PAGES} >{renderPage(currentPage)}</CommonTemplate></VoipProvider>
};

export default App;
