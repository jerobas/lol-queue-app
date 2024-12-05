import React, { useEffect, useState } from "react";
import CommonTemplate from "./templates/Common";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Discord from "./pages/Discord";
import sse from "../utils/sse";
import Voip from "./pages/Voip";

const PAGES = {
    home: { component: Home, icon: "fa-solid fa-home", name: "home" },
    settings: { component: Settings, icon: "fa-solid fa-gear", name: "settings" },
    discord: { component: Discord, icon: "fa-brands fa-discord", name: "discord" },
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

    return <CommonTemplate goToPage={setCurrentPage} pagesDict={PAGES} >{renderPage(currentPage)}</CommonTemplate>;
};

export default App;
