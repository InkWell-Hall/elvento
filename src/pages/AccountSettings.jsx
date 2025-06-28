import React from "react";
import AccountSettingsSidebar from "../components/AccountSettingsSidebar";
import { ChevronDown, Pencil, PencilLine } from "lucide-react";

const AccountSettings = () => {
  return (
    <div className="flex bg-[#E7EFC7] overflow-x-hidden">
      <div>
        <AccountSettingsSidebar />
      </div>
      {/* Manage my account */}
      <section className="w-[70%]  h-[100%] shadow ml-9 mt-1 p-5 bg-white rounded-2xl ">
        <div className="flex ml-2 ">
          <h1 className="font-mono text-2xl">Manage My Account</h1>
        </div>
        <div className="flex gap-22">
          <div className="flex flex-col relative">
            <label className="block text-m mt-5 font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 flex border rounded py-2 px-3 w-90 outline-none"
              placeholder="vendor@example.com"
            />
            <PencilLine className="absolute bottom-2 left-83" size={15} />
          </div>
          <div className="flex flex-col relative">
            <label className="block text-m mt-5 font-medium">
              Account Number
            </label>
            <input
              type="Account Number"
              className="mt-1 flex border rounded py-2 px-3 w-90 outline-none"
              placeholder="Enter Account Number"
            />
            <PencilLine className="absolute bottom-2 left-83" size={15} />
          </div>
        </div>

        <div className="flex gap-22">
          <div className="flex flex-col relative">
            <label className="block text-m mt-5 font-medium">
              Phone Number
            </label>
            <input
              type="Number"
              placeholder="Enter Phone Number"
              className="mt-1 flex border rounded py-2 px-3 w-90 outline-none"
            />
            <PencilLine className="absolute bottom-2 left-83" size={15} />
          </div>
          <div className="flex flex-col relative">
            <label className="block text-m mt-5 font-medium">
              Address Book
            </label>
            <input
              type="Number"
              placeholder="Edit Address"
              className="mt-1 flex border rounded py-2 px-3 w-90 outline-none"
            />
            <PencilLine className="absolute bottom-2 left-83" size={15} />
          </div>
        </div>

        <div className="flex flex-col relative">
          <label className="block text-m mt-5 font-medium">Password</label>
          <input
            type="Password"
            placeholder="Enter Password"
            className="mt-1 flex border rounded py-2 px-3 w-90 outline-none"
          />
          <PencilLine className="absolute bottom-2 left-83" size={15} />
        </div>

         <div className="mt-5 ">
            <h1 className="font-mono text-2xl">Languages</h1>
            <label className="block text-m mt-2 font-medium">
              Choose Language
            </label>
            <select name="" id="" className="px-3 py-2 w-90 border outline-none rounded">
              <option value="">
                English
              </option>
              <option value="">
                French
              </option>
              <option value="">
                Spanish
              </option>
            </select>
          </div>

           <div className="mt-5 ">
            <h1 className="font-mono text-2xl ">Location</h1>
            <label className="block text-m mt-2 font-medium">
              Choose Country
            </label>
            <select name="" id="" className="px-3 py-2 w-90 border outline-none rounded">
              <option value="">
                Ghana
              </option>
              <option value="">
                United Kingdom
              </option>
              <option value="">
                South Africa
              </option>
            </select>
          </div>
          <div className="flex justify-center items-center">
        <button className=" mt-4 bg-red-600  py-2 text-white px-3">
          Delete Account
        </button>
        </div>
      </section>
    </div>
  );
};

export default AccountSettings;