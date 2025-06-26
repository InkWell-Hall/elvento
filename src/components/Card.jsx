import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Card = ({ title, price, oldPrice, discount, image, id }) => {
  return (
    <div>
      {/* <div className=" w-70 flex h-120 bg-white px-3 py-3 justify-between item-center rounded-[10px]">
        <div className="">
          <div>
            <img src={image} alt="" className="w-57 h-80" />
          </div>
          <div className="flex">
            <h1 className="text-xs mt-75">{title}</h1>
            <h3 className="text-red-500 font-bold">
              ${price}.56{" "}
              <span className="line-through text-black text-xs">
                ${oldPrice}
              </span>
            </h3>
            <p className="text-xs">
              Up to {discount} percent off dinner wears!
            </p>
          </div>
        </div>
        <div><Heart className="text-black" /></div>
      </div> */}

      <div className=" w-65 bg-white">
        <Link to={`/ad/${id}`}>
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
            <p className="text-xs">
              Up to {discount} percent off dinner wears!
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
