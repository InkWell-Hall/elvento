import React, { useState } from "react";
import { NavLink } from "react-router"; // Make sure you're using react-router-dom
import { LayoutDashboard, Plus, Settings, Store, User } from "lucide-react";
import logo from "../assets/logowhite.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const title = "ELVENTO";

  const menuItems = [
    {
      label: "Dashboard",
      href: "/vendor-dashboard",
      icon: <LayoutDashboard color="white" />,
    },
    {
      label: "Add New Ad",
      href: "/add-ad",
      icon: <Plus color="white" />,
    },
    {
      label: "Orders",
      href: "/vendor-orders",
      icon: <LayoutDashboard color="white" />,
    },
    {
      label: "Profile",
      href: "/vendor-profile",
      icon: <User color="white" />,
    },
    {
      label: "Settings",
      href: "/account-settings",
      icon: <Settings color="white" />,
    },
    {
      label: "My Shop",
      href: "/vendor-shop",
      icon: <Store />,
    },
    {
      label: "My Ads",
      href: "/vendor-ads",
      icon: <Store />,
    },
  ];

  const menuIcons = [];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-4 focus:outline-none z-50 relative cursor-pointer flex"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">&#9776;</span>
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 desk-side">
        <div className="p-6 text-2xl font-bold border-b border-gray-700 font-lead-font text-lead-text">
          {/* {title} */}
          <img src={logo} alt="" className="w-40" />
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map(({ label, href, icon }, idx) => (
            <NavLink
              key={idx}
              to={href}
              className="hover:bg-gray-700 p-2 rounded transition"
            >
              <div className=" border-gray-600 pb-2 flex gap-4">
                {icon}
                {label}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          {title}
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map(({ label, href }, idx) => (
            <NavLink
              key={idx}
              to={href}
              className="hover:bg-gray-700 p-2 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
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

export default Sidebar;
