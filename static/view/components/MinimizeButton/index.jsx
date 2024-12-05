import React from "react";

const MinimizeButton = () => {
    const handleClick = () => {
        window.windowControl.minimize();
    };

    return (
        <button
            id="minimize-button"
            className="w-8 h-8 rounded focus:outline-none"
            style={{ WebkitAppRegion: "no-drag" }}
            onClick={handleClick}
        >
            <i className="fa-solid fa-circle-minus"></i>
        </button>
    );
};

export default MinimizeButton;