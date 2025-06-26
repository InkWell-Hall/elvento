import { Edit, Heart, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { apiClient } from "../api/client";

const VendorCard = ({ title, price, oldPrice, discount, image, id }) => {
  const deleteAd = () => {
    apiClient
      .post(`/remove`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        console.log("Ad deleted successfully", response);
        // Optionally, trigger a re-fetch or page reload
      })
      .catch((error) => {
        console.error("Error deleting ad:", error);
      });
  };
  return (
    <div>
      <div className=" w-65 bg-white">
        {" "}
        <div>
          <img src={image} alt="" />
        </div>
        <div>
          <h1 className="text-xs">{title}</h1>
          <h3 className="text-red-500 font-bold">
            ${price}.56{" "}
            <span className="line-through text-black text-xs">
              {" "}
              ${oldPrice}
            </span>
          </h3>
          <p className="text-xs">Up to {discount} percent off dinner wears!</p>
          <div className="mt-2 flex gap-2">
            <Link to={`/edit-ad/${id}`}>
              <button className="bg-gray-100 cursor-pointer">
                <Edit />
              </button>
            </Link>
            <button onClick={deleteAd}>
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
