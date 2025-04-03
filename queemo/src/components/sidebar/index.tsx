import { useState } from "react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
          isOpen ? "w-20" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 focus:outline-none"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
        {isOpen && (
          <nav>
            <ul className="space-y-2 mt-4">
              <li>
                <a href="/" className="block">
                  Home
                </a>
              </li>
              <li>
                <a href="/voip" className="block">
                  Voip
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">{children}</main>
    </div>
  );
};

export default Sidebar;
