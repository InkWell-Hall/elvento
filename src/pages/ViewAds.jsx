import { Link, useNavigate, useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ArrowBigLeft,
  Delete,
  DeleteIcon,
  Edit,
  Heart,
  ShoppingBasket,
  ShoppingCartIcon,
  Store,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { products } from "../assets/asset";
import Navbar from "../components/Navbar";
import star from "../assets/star.png";
import { AdContext } from "../context/AdContext";
import RelatedAds from "../components/RelatedAds";
import filled from "../assets/filled.png";
import { apiClient } from "../api/client";

const ViewAds = () => {
  const { id } = useParams();
  const { addToCart, addToFavorite, userId, token } = useContext(AdContext);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [adData, setAdData] = useState(null);
  const [size, setSize] = useState("");
  const now = new Date();
  const [like, setLike] = useState("like");

  const liked = () => {
    const itemLiked = document.getElementById("liked");
    itemLiked.classList.toggle("bg-black");
  };
  const getAllAds = () => {
    apiClient
      .get("/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        const allAdverts = response.data.products;
        const advert = allAdverts.find((item) => String(item.id) === id);

        if (advert) {
          setAdData(advert);
          const mainImage =
            advert.image?.[0] ||
            advert.imageURL?.[0] || // fallback if data uses different key
            "";
          setImage(mainImage);
        } else {
          console.log("No ad found with ID:", id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 

  useEffect(() => {
    getAllAds();
    // getAllAdverts();
  }, []);

  // console.log(userId);

  const likeAdd = () => {
    setLike("liked");
    // adData.map((item, n) => {

    // });
    addToFavorite(adData.id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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

            <div className="w-full sm:w-[80%] relative">
              <img src={image} alt="" className="w-full h-auto" />
              {like === "liked" ? (
                <img
                  src={filled}
                  alt=""
                  onClick={() => setLike("like")}
                  className="absolute top-2 right-2 cursor-pointer w-8"
                />
              ) : (
                <Heart
                  onClick={likeAdd}
                  id="liked"
                  className="absolute top-2 right-2 cursor-pointer "
                  size={30}
                />
              )}
            </div>
          </div>

          {/*  */}

          {/* .........Ad Info......... */}
          <div className="flex-1">
            {/* <div className=" flex justify-between"> */}
            <h1 className="font-medium text-2xl mt-2">{adData?.name}</h1>
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
              {adData?.description}
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
            <div className="flex items-center gap-3.5">
              <Store onClick={() => addToFavorite(adData.id)} />

              <button
                onClick={() => addToCart(adData.id, size)}
                className="bg-black text-white px-4 py-3 text-sm  active:bg-gray-700 rounded cursor-pointer flex gap-3 items-center"
              >
                ADD TO CART
              </button>
            </div>
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
            <p className="border px-5 py-3 font-bold">REVIEWS (100)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
            illum, sit vitae repellendus totam molestiae architecto suscipit
            nulla non praesentium ipsum rerum sunt mollitia ratione id, odio
            magni unde esse? */}
            <div className="first comment flex justify-between gap-8">
              <div>
                <div className="flex">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                </div>
                <h1 className="font-bold">Jayson Cole</h1>
                <p>{now.toLocaleDateString()}</p>
              </div>

              <div className="prod-deets flex flex-col gap-3 w-150">
                <h1 className="font-bold">
                  Tenia S. June 10, 2025 Isabella Tropical Chiffon Maxi Dress
                </h1>

                <div className="flex justify-between">
                  <p className="font-bold">Fit: Fit too cut </p>
                  <p className="mr-8"> Size Ordered: "M"</p>
                </div>
                <p>
                  "Absolutely love this product! The quality exceeded my
                  expectations — sturdy, well-designed, and exactly as
                  described. It's clear a lot of thought went into making it.
                  Highly recommended!"
                </p>
              </div>

              <div className="flex gap-2">
                <ThumbsUp size={20} className="cursor-pointer" />
                <h1 className="font-bold">Helpful (0)</h1>
              </div>
            </div>
            <hr />
            {/* second comment */}
            <div className="first comment flex justify-between gap-8">
              <div>
                <div className="flex">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                </div>
                <h1 className="font-bold">Jayson Cole</h1>
                <p>{now.toLocaleDateString()}</p>
              </div>

              <div className="prod-deets flex flex-col gap-3 w-150">
                <h1 className="font-bold">
                  Tenia S. June 10, 2025 Isabella Tropical Chiffon Maxi Dress
                </h1>

                <div className="flex justify-between">
                  <p className="font-bold">Fit: Fit too cut </p>
                  <p className="mr-8"> Size Ordered: "L"</p>
                </div>
                <p>
                  "This platform is super easy to use and reliable. From
                  browsing to checkout, the entire process is smooth and
                  intuitive. Great selection, fast support, and a truly
                  user-first experience!"
                </p>
              </div>

              <div className="flex gap-2">
                <ThumbsUp size={20} className="cursor-pointer" />
                <h1 className="font-bold">Helpful (0)</h1>
              </div>
            </div>
            <hr />
            {/* third comment */}
            <div className="first comment flex  justify-between gap-8">
              <div>
                <div className="flex">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                </div>
                <h1 className="font-bold">Jayson Cole</h1>
                <p>{now.toLocaleDateString()}</p>
              </div>

              <div className="prod-deets flex flex-col gap-3 w-150">
                <h1 className="font-bold">
                  Tenia S. June 10, 2025 Isabella Tropical Chiffon Maxi Dress
                </h1>

                <div className="flex justify-between">
                  <p className="font-bold">Fit: Fit too cut </p>
                  <p className="mr-8"> Size Ordered: "M"</p>
                </div>
                <p>
                  "Really impressed with the craftsmanship and attention to
                  detail. It looks even better in person and works perfectly.
                  You can tell it's made with care — definitely worth the price"
                </p>
              </div>

              <div className="flex gap-2">
                <ThumbsUp size={20} className="cursor-pointer" />
                <h1 className="font-bold">Helpful (0)</h1>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
      <RelatedAds
        category={adData?.category}
        // subCategory={bookData.subCategory}
      />
    </>
  );
};

export default ViewAds;
