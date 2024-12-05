import React from "react";
import PageButton from "../../components/PageButton";
import "./styles.scss";

const Sidebar = ({ pagesDict, goToPage }) => {
    return (
        <div
            id="sidebar"
            className="h-full absolute top-0 left-0 p-2 flex flex-col space-y-2 items-center"
        >
            <div style={{ height: "32px" }}></div>
            {Object.values(pagesDict).map((page, index) => (
                <PageButton key={index} page={page} goToPage={goToPage} />
            ))}
        </div>
    );
};

export default Sidebar;
