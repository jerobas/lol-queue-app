import { useState } from "react";
import BurgerButton from "../burguerButton";
import { Pages } from "../../interfaces";
import PageButton from "../pageButton";

const Sidebar = ({ children, routes }: { children: React.ReactNode, routes: Pages }) => {
  const sidebarState = useState(false);
  const [isOpen, _] = sidebarState;

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isOpen ? "w-20" : "w-16"
          }`}
      >
        <BurgerButton sidebarState={sidebarState} />
        {isOpen && (
          <nav>
            <ul className="space-y-2 mt-4">
              {Object.entries(routes).map(([key, route]) => (
                <PageButton key={key} route={route} name={key} />
              ))}
            </ul>
          </nav>
        )}
      </div>

      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">{children}</main>
    </div>
  );
};

export default Sidebar;
