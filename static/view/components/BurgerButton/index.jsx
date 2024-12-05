import React, { useEffect, useState } from "react";
import "./styles.scss";

const BurgerButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.querySelector("#sidebar").classList.toggle("open", isOpen);
    }, [isOpen]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            id="burger-button"
            className={`z-20 ${isOpen ? "open" : ""}`}
            style={{ WebkitAppRegion: "no-drag" }}
            onClick={toggleOpen}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default BurgerButton;
