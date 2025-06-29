import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import VendorNavbar from "../components/VendorNavbar";
import Card from "../components/Card";
import { apiClient } from "../api/client";
import { Link } from "react-router";
import VendorCard from "../components/VendorCard";
import Title from "../components/Title";

const VendorAds = () => {
  const [vendorAd, setVendorAd] = useState([]);
  const myAds = async () => {
    try {
      const response = await apiClient.get("/allProduct", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log(response.data.product); // Optional
      setVendorAd(response.data.product); // ✅ update state here
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  useEffect(() => {
    myAds();
  }, []);
  return (
    <div>
      <Sidebar />
      <div className="">
        <div>
          <VendorNavbar />
        </div>
        <div className="sm:ml-0 md:ml-70 pt-20">
          <div className="text-6xl mb-2">
            <Title text1={"My"} text2={"Adverts"} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:ml-3">
            {vendorAd?.map((item, index) => {
              return (
                <div key={index}>
                  <VendorCard
                    id={item.id}
                    title={item.name}
                    image={item.image[0]}
                    price={item.price}
                    discount={20}
                    oldPrice={12}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAds;
