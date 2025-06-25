import { Bell, ChevronDown, Search } from "lucide-react";
import React from "react";

const VendorNavbar = () => {
  return (
    <div>
      <nav className=" flex justify-between items-center bg-white fixed w-280 right-0 vendnav h-15">
        <div className="realtive ml-5">
          <input
            type="text"
            className="w-full border border-gray-800 pl-7 rounded-2xl py-1 outline-none font-bold font-lead-font "
            placeholder="search"
          />
          <Search className="absolute top-5 ml-2" size={18} />
        </div>

        <div className="flex gap-6 justify-between items-center">
          <div className="flex bg-gray-50 px-2 py-2 rounded-full relative border border-blue-950 cursor-pointer">
            <Bell />
            <span className=" absolute right-2 bg-orange-500 text-orange-500 w-2 h-2 rounded-full"></span>
          </div>
          <span className="bg-[#4b6382] text-white py-3 px-3 font-lead-font font-bold rounded-full">
            MC
          </span>
          <div className="flex mr-4">
            <h1>Admin</h1>
            <ChevronDown className="cursor-pointer" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default VendorNavbar;
