import { BurgerButtonProps } from "../../interfaces";
import "./styles.scss";

const BurgerButton = ({ sidebarState }: BurgerButtonProps) => {
  const [isOpen, setIsOpen] = sidebarState;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="burger-button"
      className={`z-20 ${isOpen ? "open" : ""}`}
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
