import React from "react";

const DiscordJoinButton = ({ channelLink }) => {
    return (
        <a
            href={channelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
            style={{ WebkitAppRegion: "no-drag" }}
        >
            Join Game Room
        </a>
    );
};

export default DiscordJoinButton;