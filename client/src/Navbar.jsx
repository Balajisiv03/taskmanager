import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-teal-800 p-4 shadow-md fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-lg font-bold">
          Task Manager
        </Link>
        <div>
          <Link to="/home" className="text-gray-300 hover:text-white mx-2">
            Home
          </Link>
          <Link to="/completed" className="text-gray-300 hover:text-white mx-2">
            Completed Tasks
          </Link>
          <Link
            to="/incomplete"
            className="text-gray-300 hover:text-white mx-2"
          >
            Incomplete Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
