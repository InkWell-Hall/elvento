import React, { useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import empty from "../assets/emptytCart.jpg";
import { apiClient } from "../api/client";

const Cart = () => {
  const { currency, cartItems, updateQuantity, getCartAmount } =
    useContext(AdContext);

  const [cartData, setCartData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyOrder = () => {
    if (getCartAmount() <= 0) {
      toast.error("Add Product to Cart");
    } else {
      navigate("/place-order");
    }
  };

  // Fetch all products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        });
        setProductsData(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Process cart items into displayable format
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Debug logs
  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("Cart Data:", cartData);
    console.log("Products Data:", productsData);
  }, [cartItems, cartData, productsData]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="text-center text-lead-text font-lead-font flex flex-col justify-center items-center mt-5">
          <h1>Loading cart...</h1>
        </div>
      </div>
    );
  }

  return getCartAmount() === 0 ? (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-center text-lead-text font-lead-font flex flex-col justify-center items-center mt-5 ">
        <img src={empty} alt="" className="w-80" />
        <h1>Your cart is empty</h1>

        <Link to={"/collections"}>
          <button className="text-[20px] bg-black text-white py-3 px-2 rounded cursor-pointer">
            Go Shopping
          </button>
        </Link>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  ) : (
    <>
      <Navbar />
      <div className="border-t pt-14 w-[80%] mx-auto mt-4">
        <div className="text-2xl mb-3">
          <h1 className="font-lead-font text-lead-text font-light">
            YOUR <span className="font-bold">CART</span>
          </h1>
        </div>
        <div>
          {cartData.map((item, index) => {
            // Find the product data using consistent ID comparison
            const adData = productsData.find(
              (ad) => String(ad.id) === String(item.id)
            );

            // Debug log for each item
            console.log(`Looking for ID: ${item.id}, Found:`, adData);

            // Skip rendering if product not found
            if (!adData) {
              console.warn(
                `Product with ID ${item.id} not found in products data`
              );
              return null;
            }

            // Get the first image, with fallbacks
            const productImage =
              adData.image?.[0] || adData.imageURL?.[0] || "";

            return (
              <div
                key={index}
                className="py-4 border-t border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={adData.name || "Product"}
                      className="w-16 sm:w-20 rounded"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {adData.name || "Unknown Product"}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {adData.price || "0"}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === "" || value === "0") {
                      return;
                    }
                    updateQuantity(item.id, item.size, Number(value));
                  }}
                />
                <Trash2
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => {
                    updateQuantity(item.id, item.size, 0);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                className="bg-black text-white text-sm my-8 px-8 py-3 rounded cursor-pointer hover:bg-gray-800"
                onClick={verifyOrder}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
