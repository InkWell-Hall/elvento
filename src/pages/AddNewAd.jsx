import React, { useEffect, useState } from "react";
import upload from "../assets/upload.jpeg";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import { apiClient } from "../api/client";
import axios from "axios";
import VendorNavbar from "../components/VendorNavbar";
import { toast } from "react-toastify";
// import { toast } from 'react-toastify'; // Add this import if using toast

const AddNewAd = () => {
  const [images, setImages] = useState(null); // Changed from false to null
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men"); // Set default value
  const [subCategory, setSubCategory] = useState("topwear"); // Set default value
  const [bestSeller, setBestSeller] = useState(false); // Changed from "" to false
  const [size, setSize] = useState([]); // Changed from "" to []
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postAd = async (event) => {
    console.log("Form submitted");
    event.preventDefault();
    setLoading(true);

    try {
      // Handle image upload - you might need to convert FileList to proper format
      let imageData = [];
      if (images && images.length > 0) {
        // For now, just getting file names - you might need to upload to a service
        imageData = Array.from(images).map((file) => file.name);
      }

      let data = {
        name,
        images: imageData, // Fixed: removed .trim() and handled properly
        price: Number(price), // Convert to number
        bestSeller,
        subCategory,
        description,
        size, // This is now properly an array
        category,
      };

      console.log("Sending data:", data); // Debug log

      const response = await apiClient.post("/advert", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      console.log("Response:", response);

      if (response.status === 201) {
        // toast.success("Product added successfully"); // Uncomment if using toast
        toast.succes("Product added successfully!"); // Temporary alert

        // Reset form
        setName("");
        setDescription("");
        setImages(null);
        setPrice("");
        setSize([]);
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("topwear");
      }
    } catch (error) {
      console.error("Error posting ad:", error);
      // toast.error(error.response?.data?.message || "Error adding product"); // Uncomment if using toast
      toast.error(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      ); // Temporary alert
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setName("");
    setDescription("");
    setImages(null); // Fixed: reset images properly
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
    setCategory("Men");
    setSubCategory("topwear");
    setBestSeller(false); // Fixed: use boolean
    setPrice("");
    setSize([]); // Fixed: reset to empty array
  };

  const getAllAds = async () => {
    try {
      const response = await apiClient.get("/ordersAdevrt", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

  return (
    <>
      <div className="home flex-col md:flex min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <Sidebar />
        <div>
          <VendorNavbar />
          <div className="lg:ml-50 ml-0 md:ml-30 mt-20">
            <form
              onSubmit={postAd}
              className="flex flex-col items-center w-full max-w-3xl gap-4 md:ml-50 rounded-2xl m-4 bg-white"
            >
              <div className="bg-[#4b6382] text-white rounded add w-full text-center font-lead-font text-lead-text h-40 flex justify-center items-center">
                <h1>Post New Ad</h1>
              </div>

              <div className="flex flex-col items-center w-full gap-3">
                <p className="mb-2 font-lead-font text-[30px]">Upload Image</p>
                <div className="flex gap-2 justify-center">
                  <label htmlFor="images">Upload Images</label>
                  <input
                    type="file"
                    name="images"
                    className="w-90 border"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col items-center">
                <p className="mb-2 font-lead-font text-[30px]">Product name</p>
                <input
                  type="text"
                  placeholder="type here"
                  className="w-full max-w-[500px] px-3 py-2 border border-gray-800 rounded-[5px] outline-none"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <p className="mb-2 font-lead-font text-[30px]">
                  Product description
                </p>
                <textarea
                  type="text"
                  placeholder="Write description here"
                  className="w-full max-w-[500px] px-3 py-2 border outline-none resize-none rounded-[5px]"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full justify-center sm:gap-8">
                <div>
                  <p className="mb-2 font-lead-font text-[20px]">
                    Product category
                  </p>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="w-full px-3 py-2 border p-2 outline-none rounded-[5px]"
                    required
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <p className="mb-2 font-lead-font text-[20px]">
                    Sub Category
                  </p>
                  <select
                    className="w-full px-3 py-2 border outline-none rounded-[5px]"
                    onChange={(e) => setSubCategory(e.target.value)}
                    value={subCategory}
                    required
                  >
                    <option value="topwear">Topwear</option>
                    <option value="bottomwear">Bottomwear</option>
                    <option value="winterwear">Winterwear</option>
                  </select>
                </div>

                <div>
                  <p className="mb-2 font-lead-font text-[20px]">
                    Product Price
                  </p>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="w-full px-3 py-2 sm:w-[120px] border outline-none rounded-[5px]"
                    type="number"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <p className="font-lead-font text-[20px] font-medium">
                  Product Sizes
                </p>
                <div className="flex gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                    <div
                      key={sizeOption}
                      onClick={() =>
                        setSize((prev) =>
                          prev.includes(sizeOption)
                            ? prev.filter((item) => item !== sizeOption)
                            : [...prev, sizeOption]
                        )
                      }
                    >
                      <p
                        className={`${
                          size.includes(sizeOption)
                            ? "bg-gray-800 text-white"
                            : "bg-white"
                        } px-3 py-1 cursor-pointer border rounded`}
                      >
                        {sizeOption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <input
                  type="checkbox"
                  id="bestseller"
                  onChange={() => setBestSeller((prev) => !prev)}
                  checked={bestSeller}
                />
                <label className="cursor-pointer" htmlFor="bestseller">
                  Add to bestseller
                </label>
              </div>

              <div className="flex gap-20 mb-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-28 py-3 mt-4 bg-[#4b6382] text-white rounded font-bold cursor-pointer"
                  disabled={loading}
                >
                  CLEAR
                </button>
                <button
                  type="submit"
                  className="w-28 py-3 mt-4 bg-[#4b6382] text-white rounded font-bold cursor-pointer disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "ADDING..." : "ADD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewAd;
