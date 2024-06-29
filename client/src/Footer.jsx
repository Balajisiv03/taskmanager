import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white text-center py-6">
      <div className="container mx-auto">
        <div className="mb-4">
          <p>&copy; 2024 Task Manager. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a href="" className="underline">
              Balaji S
            </a>
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <div className="flex justify-center space-x-4">
            <Link to="/home" className="underline">
              Home
            </Link>
            <Link to="/create" className="underline">
              Add Task
            </Link>
            <Link to="/about" className="underline">
              About
            </Link>
            <Link to="/contact" className="underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
          <p>
            Email:{" "}
            <a
              href="mailto:@balajisivakumar2003@gmail.com"
              className="underline"
            >
              balajisivakumar2003@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:7358388433" className="underline">
              +917358388433
            </a>
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com/" className="underline">
              Facebook
            </a>
            <a href="https://linkedin.com/in/balajisiv03" className="underline">
              LinkedIn
            </a>
            <a href="https://github.com/balajisiv03" className="underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
