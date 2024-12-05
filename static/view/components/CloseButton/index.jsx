import React from "react";

const CloseButton = () => {
    const handleClick = () => {
        window.windowControl.close();
    };

    return (
        <button
            id="close-button"
            className="w-8 h-8 rounded focus:outline-none"
            style={{ WebkitAppRegion: "no-drag" }}
            onClick={handleClick}
        >
            <i className="fa-solid fa-circle-xmark"></i>
        </button>
    );
};

export default CloseButton;