import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import VendorNavbar from "../components/VendorNavbar";
import { useNavigate, useParams } from "react-router";
import upload from "../assets/upload.jpeg";
import { apiClient } from "../api/client";

const EditAd = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  // Store original image URLs separately
  const [originalImage1, setOriginalImage1] = useState("");
  const [originalImage2, setOriginalImage2] = useState("");
  const [originalImage3, setOriginalImage3] = useState("");
  const [originalImage4, setOriginalImage4] = useState("");
  const [advert, setAdvert] = useState([]);

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [size, setSize] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleReset = (event) => {
    event.preventDefault();
    setName("");
    setDescription("");
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setCategory("Men");
    setSubCategory("topwear");
    setBestSeller(false);
    setPrice("");
    setSize([]);
  };

  // Helper function to get image source
  const getImageSrc = (newImage, originalImage) => {
    if (newImage) {
      return URL.createObjectURL(newImage);
    }
    if (originalImage) {
      return originalImage;
    }
    return upload;
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching ad data for ID:", id);
      apiClient
        .get(`/single/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        })
        .then((response) => {
          console.log("Full API Response:", response);
          console.log("Response Data:", response.data);
          console.log("Response.data.adverts:", response?.data?.adverts);

          setAdvert(response?.data?.adverts);
          // console.log(advert);
        })
        .catch((error) => {
          console.error("Error fetching ad data:", error);
        });
    }
  }, [id]); // This will run whenever advert changes
  useEffect(() => {
    if (advert && advert.length > 0) {
      const advertData = advert[0];
      console.log("Populating form with:", advertData);

      setName(advertData.name || "");
      setDescription(advertData.description || "");
      setPrice(advertData.price || "");
      setCategory(advertData.category || "Men");
      setSubCategory(advertData.subCategory || "topwear");
      setBestSeller(advertData.bestSeller || false);
      setSize(advertData.size || []);

      // Set original image URLs
      setOriginalImage1(advertData.image1 || "");
      setOriginalImage2(advertData.image2 || "");
      setOriginalImage3(advertData.image3 || "");
      setOriginalImage4(advertData.image4 || "");
    }
  }, [advert]); // This only runs when advert changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("bestSeller", bestSeller);
    formData.append("size", JSON.stringify(size));

    // Only append images if new ones were selected
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      const response = await apiClient.patch(`/single/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Update successful:", response.data);
      console.log("Current form state:", {
        name,
        description,
        category,
        subCategory,
        price,
        bestSeller,
        size,
        hasImage1: !!image1,
        hasImage2: !!image2,
        hasImage3: !!image3,
        hasImage4: !!image4,
      });
      navigate("/vendor-ads");
    } catch (err) {
      console.error("Failed to update ad:", err);

      alert("Failed to update ad. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(advert);
  }, []);

  return (
    <div>
      <>
        <div className="home flex-col md:flex min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
          <Sidebar />
          <div>
            <VendorNavbar />
            <div className="lg:ml-50 ml-0 md:ml-30 mt-20">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-3xl gap-4 md:ml-50 rounded-2xl m-4 bg-white"
              >
                <div className="bg-[#4b6382] text-white rounded add w-full text-center font-lead-font text-lead-text h-40 flex justify-center items-center">
                  <h1>Edit Advert</h1>
                </div>

                <div className="flex flex-col items-center w-full gap-3">
                  <p className="mb-2 font-lead-font text-[30px]">
                    Upload Image
                  </p>
                  <div className="flex gap-2">
                    <label htmlFor="image1">
                      <img
                        className="w-20"
                        src={getImageSrc(image1, originalImage1)}
                        alt=""
                      />
                      <input
                        onChange={(e) => setImage1(e.target.files[0])}
                        type="file"
                        id="image1"
                        name="image1"
                        hidden
                        // Removed required attribute for editing
                      />
                    </label>

                    <label htmlFor="image2">
                      <img
                        className="w-20"
                        src={getImageSrc(image2, originalImage2)}
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
                        src={getImageSrc(image3, originalImage3)}
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
                        src={getImageSrc(image4, originalImage4)}
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
                  <p className="mb-2 font-lead-font text-[30px]">
                    Product name
                  </p>
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
                    {loading ? "UPDATING..." : "UPDATE"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default EditAd;
