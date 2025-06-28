import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import logo1 from "../assets/logowhite.png";

const AccountSettingsSidebar = () => {
  return (
    // <div className="relative">
      <div className="w-60 bg-gray-800 h-[100vh] rounded-r-3xl text-white ">
        <div className="hidden md:block w-64 bg-black text-white h-screen fixed left-0 top-0 desk-side">
                <div className="p-6 text-2xl font-bold border-b border-white font-lead-font text-lead-text">
                  {/* {title} */}
                  <img src={logo1} alt="" className="w-40" />
                </div>
        {/* <hr className="my-2" /> */}
        <Link to={"/account-settings"}>
          <div className="flex justify-between items-center">
            <span className="mt-5">Manage My Account</span>
            <ChevronRight className="w-5 mt-5 h-5" />
          </div>
        </Link>

        {/* <hr className="my-3" /> */}
          <Link to={"/privacy"}>
          <div className="flex justify-between">
            <span className="mt-5">Privacy & Cookies</span>
            <ChevronRight className="w-5 mt-5 h-5" />
             </div>
          </Link>
       
        {/* <hr className="my-3" /> */}
          <Link to={"/terms"}>
          <div className="flex justify-between">
            <span className="mt-5">Term & Conditions</span>
            <ChevronRight className="w-5 mt-5 h-5" />
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
