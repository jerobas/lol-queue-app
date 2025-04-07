import "./styles.scss";

interface BurgerButtonProps {
    sidebarState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const BurgerButton = ({ sidebarState }: BurgerButtonProps) => {
    const [isOpen, setIsOpen] = sidebarState;

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            id="burger-button"
            className={`z-20 ${isOpen ? "open" : ""}`}
            //style={{ WebkitAppRegion: "no-drag" }}
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