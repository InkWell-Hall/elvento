import { Edit, Heart, Trash } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { apiClient } from "../api/client";
import Modal from "../modals/DeleteAdModal";
import { toast } from "react-toastify";

const VendorCard = ({ title, price, oldPrice, discount, image, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const deleteAd = () => {
    apiClient
      .delete(`/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        console.log("Ad deleted successfully", response);
        window.location.reload();
        toast.success("Advert Deleted Succesfully");
        // Optionally, trigger a re-fetch or page reload
      })
      .catch((error) => {
        console.error("Error deleting ad:", error);
      });
  };
  return (
    <div className="mb-4 ">
      <div className=" w-65 bg-white px-3 py-2 rounded">
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
        <div className="mt-2 flex justify-between gap-2 items-center">
          <Link to={`/edit-ad/${id}`}>
            <button className="bg-gray-100 cursor-pointer px-2 rounded-full py-2">
              <Edit color="gray" />
            </button>
          </Link>

          <button
            onClick={openModal}
            className="bg-gray-100 cursor-pointer mb-1.5 px-2 py-2 rounded-full"
          >
            <Trash color="red" />
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4 font-lead-font">
          Delete Advert
        </h2>
        <p className="mb-3">Are you sure you want to delete this Advert?</p>
        {/* <p>Please we beg reconsider oo!!</p> */}
        <div className="flex justify-between gap-3 mt-2">
          <button
            className="bg-gray-700 px-2 py-1 text-white cursor-pointer rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-900 px-2 py-1 text-white cursor-pointer rounded"
            onClick={deleteAd}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VendorCard;
