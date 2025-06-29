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
import Title from "../components/Title";
import Card from "../components/Card";

const Cart = () => {
  const { currency, cartItems, updateQuantity, getCartAmount, allAds } =
    useContext(AdContext);

  const [cartData, setCartData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOrder = () => {
    if (getCartAmount() <= 0) {
      toast.error("Add Product to Cart");
    } else {
      navigate("/place-order");
    }
  };

  useEffect(() => {
    if (allAds.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, allAds]);
  console.log(cartData);
  useEffect(() => {
    getCartAmount();
  }, []);

  const deleteUserCart = async () => {
    try {
      const response = await apiClient
        .delete(`/delete/${cartData[0].id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        })
        .then((response) => console.log(response), window.location.reload());
    } catch (error) {
      console.log(error.message);
    }
  };
  // Process cart items into displayable format
  // useEffect(() => {
  //   const tempData = [];
  //   for (const itemId in cartItems) {
  //     for (const size in cartItems[itemId]) {
  //       if (cartItems[itemId][size] > 0) {
  //         tempData.push({
  //           id: itemId,
  //           size: size,
  //           quantity: cartItems[itemId][size],
  //         });
  //       }
  //     }
  //   }
  //   setCartData(tempData);
  // }, [cartItems]);

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
      <div className="flex flex-col bg-rebecca min-h-screen">
        <Navbar />
        <div className="border-t pt-14 w-[80%] mx-auto mt-4">
          <div className="text-2xl mb-3">
            <h1 className="font-lead-font text-lead-text font-light">
              <Title text1={"YOUR"} text2={"CART"} />
            </h1>
          </div>
          <div>
            {cartData?.map((item, index) => {
              const adData = allAds?.find((ad) => ad.id === item.id);
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b grid grid-cols-[4fr_0.5fr_0.5] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <div>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="px-2 sm:px-3 sm:py-1  bg-slate-50">
                          {/* {item.size} */}
                          <Card
                            discount={89}
                            id={item.id}
                            image={adData.image[0]}
                            oldPrice={90}
                            price={24}
                            title={adData.name}
                            key={index}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    onChange={(event) =>
                      event.target.value === "" || event.target.value === "0"
                        ? null
                        : updateQuantity(
                            item.id,
                            item.size,
                            Number(event.target.value)
                          )
                    }
                  />
                  <Trash2 className="cursor-pointer" onClick={deleteUserCart} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end my-20 mx-5">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => verifyOrder()}
                className="bg-black cursor-pointer text-white text-sm my-8 px-8 py-3 active:bg-gray-700"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Cart;
