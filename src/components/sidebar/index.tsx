import { useState } from "react";
import BurgerButton from "../burguerButton";
import { Pages } from "../../interfaces";
import PageButton from "../pageButton";

const Sidebar = ({ children, routes }: { children: React.ReactNode, routes: Pages }) => {
  const sidebarState = useState(false);
  const [isOpen, _] = sidebarState;

  return (
    <div className="flex grow relative">
      <div
        className={`text-white p-4 transition-all duration-300 absolute z-10 h-min`}
      >
        <BurgerButton sidebarState={sidebarState} />
      </div>
      <div className={"p-4 pt-[47px] transform transition-transform duration-300 absolute bg-amber-950 h-full" + (isOpen ? "" : " -translate-x-full")}>
        <ul className="space-y-2">
          {Object.entries(routes).map(([key, route]) => (
            <PageButton key={key} route={route} name={key} />
          ))}
        </ul>
      </div>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">{children}</main>
    </div>
  );
};

export default Sidebar;
