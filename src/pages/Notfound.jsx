import React from "react";
import image from "../assets/404.jpg.jpg";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen px-8">
        <img src={image} alt="404 page" />
      </div>

      <div className="flex justify-center mt-2">
        <Link to="/">
          <button className="bg-black hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 items-center cursor-pointer">
            Continue shopping
          </button>
        </Link>
      </div>
    </>
  );
}
