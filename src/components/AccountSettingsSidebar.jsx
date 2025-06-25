import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const AccountSettingsSidebar = () => {
  return (
    <div className="relative">
      <div className="w-60 bg-gray-800 h-[100vh] rounded-r-3xl text-white ">
        <div className=" flex justify-center items-center">
          <h1 className="font-mono mt-14 text-2xl">Settings</h1>
        </div>
        <hr className="my-2" />
        <Link to={"/account-settings"}>
          <div className="flex justify-between items-center">
            <span className="">Manage My Account</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </Link>

        <hr className="my-3" />
          <Link to={"/privacy"}>
          <div className="flex justify-between">
            <span>Privacy & Cookies</span>
            <ChevronRight className="w-5 h-5" />
             </div>
          </Link>
       
        <hr className="my-3" />
          <Link to={"/terms"}>
          <div className="flex justify-between">
            <span>Term & Conditions</span>
            <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        
        <div className="flex absolute bottom-2 text-white reletive">
          <button className="border ml-33 font-mono px-3 py-1 rounded-2xl border-blue-200">
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSidebar;
