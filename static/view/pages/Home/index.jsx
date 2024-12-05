import React, { useEffect, useState } from "react";
import TeemoImage from "../../components/TeemoImage";
import DiscordJoinButton from "../../components/DiscordJoinButton";

const Home = ({ eventSource }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data).message;
            setMessage(newMessage);
        };
    }, [eventSource]);

    return (
        <div>
            <div className="mt-4 text-lg" id="server-updates"></div>
            <TeemoImage message={message} />
            <DiscordJoinButton channelLink="https://discord.gg/EzDj9rUk" />
        </div>
    );
};

export default Home;
