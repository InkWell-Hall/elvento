import React, { useEffect, useState } from "react";
import upload from "../assets/upload.jpeg";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import { apiClient } from "../api/client";
import axios from "axios";
import VendorNavbar from "../components/VendorNavbar";
import { toast } from "react-toastify";

const AddNewAd = () => {
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
      // Create FormData object for file uploads
      const formData = new FormData();

      // Append text fields - make sure field names match backend
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller); // Changed to match backend expectation
      formData.append("size", JSON.stringify(size)); // Changed to match backend expectation

      // Append image files (only if they exist)
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await apiClient.post("/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          // Don't set Content-Type for FormData - let browser handle it
        },
      });

      console.log("Response:", response);

      if (response.status === 201) {
        toast.success("Product added successfully!");

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setSize([]);
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("topwear");
        // Reset images
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.error("Error posting ad:", error);

      // More detailed error logging
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(
          "Error adding product: " +
            (error.response.data?.message || error.response.statusText)
        );
      } else {
        toast.error("Error adding product: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleReset = (event) => {
    event.preventDefault();
    setName("");
    setDescription("");
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
      const response = await apiClient.get("/list", {
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
                <div className="flex gap-2">
                  <label htmlFor="image1">
                    <img
                      className="w-20"
                      src={!image1 ? upload : URL.createObjectURL(image1)}
                      alt=""
                    />
                    <input
                      onChange={(e) => setImage1(e.target.files[0])}
                      type="file"
                      id="image1"
                      name="image1"
                      hidden
                      required
                    />
                  </label>

                  <label htmlFor="image2">
                    <img
                      className="w-20"
                      src={!image2 ? upload : URL.createObjectURL(image2)}
                      alt=""
                    />
                    <input
                      onChange={(e) => setImage2(e.target.files[0])}
                      type="file"
                      id="image2"
                      name="image2"
                      hidden
                    />
                  </label>

                  <label htmlFor="image3">
                    <img
                      className="w-20"
                      src={!image3 ? upload : URL.createObjectURL(image3)}
                      alt=""
                    />
                    <input
                      onChange={(e) => setImage3(e.target.files[0])}
                      type="file"
                      id="image3"
                      name="image3"
                      hidden
                    />
                  </label>

                  <label htmlFor="image4">
                    <img
                      className="w-20"
                      src={!image4 ? upload : URL.createObjectURL(image4)}
                      alt=""
                    />
                    <input
                      onChange={(e) => setImage4(e.target.files[0])}
                      type="file"
                      name="image4"
                      id="image4"
                      hidden
                    />
                  </label>
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
