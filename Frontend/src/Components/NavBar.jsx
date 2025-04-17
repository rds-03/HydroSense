import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">My App</h1>
      <div className="space-x-4">
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800"
        >
          Dashboard
        </Link>
        <Link
          to="/logout"
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
