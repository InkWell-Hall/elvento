import React from "react";
// import image from '../assets/notfound.jpg'
import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center h-screen px-8">
        {/* <img src={image} alt="notfound page" className="flex w-150 h-120" /> */}
      </div>

      <div className="flex justify-center mb-50">
        <Link to="/">
          <button className="bg-black hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 items-center cursor-pointer ">
            Continue shopping
          </button>
        </Link>
      </div>
    </>
  );
}
