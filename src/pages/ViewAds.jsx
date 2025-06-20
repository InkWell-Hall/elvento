import { Link, useNavigate, useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/images/assets";
// import RelatedBooks from "../components/Related";
// import { apiClient } from "../api/client";
import upload from "../assets/upload.jpeg";
import { ArrowBigLeft, Delete, DeleteIcon, Edit, Trash2 } from "lucide-react";
// import Modal from "../modals/DeleteBookModal";
import { toast } from "react-toastify";
import RelatedAds from "../components/RelatedAds";
// import loadingicon from "../assets/images/loadingicon.gif";

const ViewAds = () => {
  const { bookId } = useParams();

  const bookData = [
    {
      title: "In the heart of a woman",
      imageURL: upload,
    },
  ];
  // const { deleteBook } = useContext(ShopContext);
  const navigate = useNavigate();
  // const [bookData, setBookData] = useState(null);
  const [image, setImage] = useState("");

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);

  return (
    <>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-10">
        {/* BookData */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* bookImage */}
          <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full"></div>
            <div className="w-full sm:w-[80%]">
              {/* <img src={image} alt="" className="w-full h-auto" /> */}
            </div>
          </div>
          {/* .........book Info......... */}
          <div className="flex-1">
            <div className=" flex justify-between">
              <h1 className="font-medium text-2xl mt-2">Alata</h1>
              <Link to={"/collections"}>
                <button className="text-white bg-black px-2 py-2 whitespace-nowrap rounded font-body-font cursor-pointer flex">
                  <ArrowBigLeft /> Go Back
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="pl-2">(677)</p>
            </div>
            <p className="mt-5 text-3xl ">
              Written by: <span className="font-medium">Aman</span>
            </p>
            <p className="mt-5 text-gray-500 md-w-4/5">
              {/* {bookData.description} */}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem,
              eius.
            </p>
            <hr className="mt-4 sm:w-4/5" />
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
            <div className="actions">
              <h1 className="text-2xl font-lead-font font-bold mb-5">
                Actions
              </h1>
              <div className="flex gap-1.5 items-center">
                <Link
                  to={`/edit-book/${bookData.id}`}
                  className="bg-gray-500 py-2 px-2 rounded"
                >
                  <Edit className="cursor-pointer" />
                </Link>
                <div className=" bg-red-400 py-2 px-2 rounded">hugu</div>
              </div>
            </div>
          </div>
        </div>
        {/* book description */}
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
