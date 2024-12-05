import React from "react";

const PageButton = ({ page, goToPage }) => {
    const handleClick = () => {
        goToPage(page["name"]);
    };

    return (
        <button
            id="page-button"
            className="w-5 h-5 rounded focus:outline-none"
            onClick={handleClick}
            style={{ WebkitAppRegion: "no-drag" }}
        >
            <i className={page["icon"]}></i>
        </button>
    );
};

export default PageButton;
