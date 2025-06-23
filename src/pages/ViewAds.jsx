import { Link, useNavigate, useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { ArrowBigLeft, Delete, DeleteIcon, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { products } from "../assets/asset";
import Navbar from "../components/Navbar";
import star from "../assets/star.png";
import { AdContext } from "../context/AdContext";

const ViewAds = () => {
  const { bookId } = useParams();
  const { addToCart } = useContext(AdContext);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [adData, setAdData] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    products.map((item, index) => {
      setAdData(item);
      setImage(item.image[0]);
    });
    // return null;
    console.log(adData);
  }, []);
  return (
    <>
      <Navbar />

      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 w-[80%] mx-auto mt-3">
        {/* AdData */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* AdImage */}
          <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {adData?.image?.map((item, index) => (
                <img
                  src={item}
                  alt={item.name}
                  className="w-24 sm:mb-3 flex-shrink-0 cursor-pointer"
                  key={index}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>

            <div className="w-full sm:w-[80%]">
              <img src={image} alt="" className="w-full h-auto" />
            </div>
          </div>

          {/*  */}

          {/* .........Ad Info......... */}
          <div className="flex-1">
            {/* <div className=" flex justify-between"> */}
            <h1 className="font-medium text-2xl mt-2">Alata</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={star} alt="" className="w-5 5" />
              <img src={star} alt="" className="w-5 5" />
              <img src={star} alt="" className="w-5 5" />
              <img src={star} alt="" className="w-5 5" />
              <img src={star} alt="" className="w-5 5" />
              <p className="pl-2">(677)</p>
            </div>

            <p className="mt-5 text-3xl ">$569</p>
            <p className="mt-5 text-gray-500 md-w-4/5 mb-5">
              {/* {AdData.description} */}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem,
              eius. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Incidunt minima fugiat quam fuga quaerat veritatis alias,
              molestiae quia. Expedita, veritatis libero non ducimus aliquam
              labore repellendus asperiores quo recusandae rerum!
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p className="font-lead-font">Select Size</p>
              <div className="flex gap-2">
                {adData?.sizes?.map((items, index) => (
                  <button
                    onClick={() => setSize(items)}
                    key={index}
                    className={`border py-2 px-4 cursor-pointer bg-gray-100 ${
                      items === size ? "border-orange-500" : " "
                    }`}
                  >
                    {items}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToCart(adData.id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
            >
              ADD TO CART
            </button>
            <hr className="mt-4 sm:w-4/5 mb-3" />
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
        {/* Ad description */}
        <div className="mt-20">
          <div className="flex">
            <b className="border px-5 py-3 text-sm">Description</b>
            <p className="border px-5 py-3 text-sm">Reviews (100)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
            illum, sit vitae repellendus totam molestiae architecto suscipit
            nulla non praesentium ipsum rerum sunt mollitia ratione id, odio
            magni unde esse?
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAds;
