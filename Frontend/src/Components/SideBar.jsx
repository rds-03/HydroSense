import { Link } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-3 text-white bg-gray-800 fixed top-4 left-4 rounded-md md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-60 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-40`}
      >
        <div className="p-5 font-bold text-xl">Menu</div>
        <ul className="flex flex-col space-y-4 p-5">
          <li>
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/Cafe"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Nearby Cafés
            </Link>
          </li>
          <li>
            <Link
              to="/tracking"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Hydration Tracker
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
