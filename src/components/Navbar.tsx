import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Cross, Menu } from "lucide-react";
import { motion } from "framer-motion";
import image from "@/assets/image.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Events", path: "/events" },
    { name: "Resources", path: "/resources" },
    { name: "Admin", path: "/login" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <img src={image} alt="" className="h-8 w-8" />
              {/* <Globe className="h-8 w-8" /> */}
            </motion.div>
            <span className="font-bold text-xl group-hover:text-blue-200 text-white transition-colors">
              Reach Out To All
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="relative group">
                <span className="hover:text-blue-200 text-white transition-colors">
                  {item.name}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-blue-200 bottom-[-4px]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Cross /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 hover:text-blue-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
