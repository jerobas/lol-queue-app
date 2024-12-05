import React from "react";
import BurgerButton from "../../components/BurgerButton";
import MinimizeButton from "../../components/MinimizeButton";
import CloseButton from "../../components/CloseButton";

const Header = () => {
    return (
        <div
            id="header"
            className="w-full absolute top-0 right-0 mt-2 px-2 flex justify-between items-center"
        >
            <BurgerButton />
            <div className="flex space-x-1">
                <MinimizeButton />
                <CloseButton />
            </div>
        </div>
    );
};

export default Header;
