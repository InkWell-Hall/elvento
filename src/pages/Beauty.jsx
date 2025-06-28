import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

import beauty1 from "../assets/beauty1.png";
import beauty2 from "../assets/beauty2.png";
import beauty3 from "../assets/beauty3.jpeg";
import beauty4 from "../assets/beauty4.jpeg";

const Beauty = () => {
  const beautyAds = [
    {
      title: "Lola basics-multi colored",
      image: beauty1,
      price: 23,
      oldPrice: 45,
      discount: 50,
    },
    {
      title: "Sena lisa",
      image: beauty2,
      price: 18,
      oldPrice: 25,
      discount: 30,
    },
    {
      title: "Juvit multi-colored",
      image: beauty3,
      price: 27,
      oldPrice: 35,
      discount: 50,
    },
    {
      title: "Silacs rubisx",
      image: beauty4,
      price: 67,
      oldPrice: 105,
      discount: 50,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="py-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-10">Beauty Collection</h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {beautyAds.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              image={item.image}
              price={item.price}
              oldPrice={item.oldPrice}
              discount={item.discount}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Beauty;
