import React, { useEffect, useState } from "react";
import accept from "../../../assets/accept.png";
import menu from "../../../assets/menu.png";
import lobby from "../../../assets/lobby.png";
import queue from "../../../assets/queue.png";
import Loading from "../Loading";

const imageDict = {
    ReadyCheck: accept,
    "You are not able to accept a queue": menu,
    Lobby: lobby,
    Matchmaking: queue,
};

const TeemoImage = ({ message }) => {
    const [imageContent, setImageContent] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (!message) {
                setImageContent(<p>Erro na comunicação com o servidor</p>);
            } else if (imageDict[message]) {
                setImageContent(
                    <img
                        src={imageDict[message]}
                        alt={message}
                        className="mx-auto mt-4"
                        width="300"
                        height="300"
                    />
                );
            } else {
                setImageContent(<p>{message}</p>);
            }
        };

        fetchImage();
    }, [message]);

    return imageContent || <Loading />;
};

export default TeemoImage;
