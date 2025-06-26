import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import VendorNavbar from "../components/VendorNavbar";
import Card from "../components/Card";
import { apiClient } from "../api/client";

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
        <div className="ml-70">
          {vendorAd?.map((item, index) => {
            return (
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
                key={index}
              >
                <Card id={item.id} title={item.name} image={item.image[0]} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorAds;
