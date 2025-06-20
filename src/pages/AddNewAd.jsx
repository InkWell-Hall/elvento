import React, { useState } from "react";
import upload from "../assets/upload.jpeg";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";

const AddNewAd = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState("");
  const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();

  return (
    <>
      <div className="home flex min-h-screen overflow-x-hidden bg-gray-500">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center">
          <form className="p-4 flex flex-col items-center w-full max-w-3xl gap-4 md:ml-50 bg-white rounded-2xl m-4">
            <div className="flex flex-col items-center w-full gap-3">
              <p className="mb-2 font-lead-font text-[30px]">Upload Image</p>

              <div className="flex gap-2 justify-center">
                <label htmlFor="image1">
                  <img
                    className="w-20"
                    src={!image2 ? upload : URL.createObjectURL(image2)}
                    alt=""
                  />{" "}
                  <input
                    onChange={(e) => setImage1(e.target.files[0])}
                    type="file"
                    id="image1"
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
                className="w-full max-w-[500px] px-3 py-2  bg-amber-100 rounded-[5px] outline-none"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <p className="mb-2  font-lead-font text-[30px]">
                Product description
              </p>
              <textarea
                type="text"
                placeholder="Write description here"
                className="w-full max-w-[500px] px-3 py-2 bg-amber-100 outline-none"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className=" flex flex-col sm:flex-row gap-2 w-full justify-center sm:gap-8">
              <div>
                <p className="mb-2 font-lead-font text-[20px]  ">
                  Product category
                </p>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-amber-100 p-2 outline-none"
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div>
                <p className="mb-2 font-lead-font text-[20px]">Sub Category</p>
                <select
                  className="w-full px-3 py-2 bg-amber-100  outline-none rounded"
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="Select Category"
                  required
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>

              <div>
                <p className="mb-2 font-lead-font text-[20px]">Product Price</p>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-full px-3 py-2 sm:w-[120px] bg-amber-100  outline-none"
                  type="Number"
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
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("S")
                        ? prev.filter((item) => item !== "S")
                        : [...prev, "S"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("S") ? "bg-pink-200" : "bg-gray-500"
                    } px-3 py-1 cursor-pointer`}
                  >
                    S
                  </p>
                </div>

                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("M")
                        ? prev.filter((item) => item !== "M")
                        : [...prev, "M"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("M") ? "bg-pink-200" : "bg-gray-500"
                    } px-3 py-1 cursor-pointer`}
                  >
                    M
                  </p>
                </div>

                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("L")
                        ? prev.filter((item) => item !== "L")
                        : [...prev, "L"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("L") ? "bg-pink-200" : "bg-gray-500"
                    } px-3 py-1 cursor-pointer`}
                  >
                    L{" "}
                  </p>
                </div>

                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("XL")
                        ? prev.filter((item) => item !== "XL")
                        : [...prev, "XL"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("XL") ? "bg-pink-200" : "bg-gray-500"
                    } px-3 py-1 cursor-pointer`}
                  >
                    XL
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes("XXL")
                        ? prev.filter((item) => item !== "XXL")
                        : [...prev, "XXL"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("XXL") ? "bg-pink-200" : "bg-gray-500"
                    } px-3 py-1 cursor-pointer`}
                  >
                    XXL
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <input
                type="checkbox"
                id="bestseller"
                onChange={() => setBestseller((prev) => !prev)}
                checked={bestseller}
              />
              <label className="cursor-pointer" htmlFor="bestseller">
                Add to bestseller
              </label>
            </div>

            <button
              type="submit"
              className="w-28 py-3 mt-4 bg-black text-white cursor-pointer"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewAd;
