import React, { useState } from "react";
import { Link } from "react-router"; // Fixed import

const VendorSidebar = ({ links = [], title = "Menu" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-4 focus:outline-none z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">&#9776;</span>
      </button>

      {/* Desktop sidebar (static layout) */}
      <div className="hidden md:block w-64 bg-[#dfbac0] text-white h-screen">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          {title}
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {links.map(({ label, href }, idx) => (
            <Link
              key={idx}
              to={href}
              className="hover:bg-gray-700 p-2 rounded transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile sidebar (overlayed) */}
      <div
        className={`
          md:hidden fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-40 transform
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          {title}
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {links.map(({ label, href }, idx) => (
            <Link
              key={idx}
              to={href}
              className="hover:bg-gray-700 p-2 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default VendorSidebar;
