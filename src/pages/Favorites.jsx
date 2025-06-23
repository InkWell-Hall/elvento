import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Favorites = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h1>Welcome the favorites page</h1>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Favorites;
