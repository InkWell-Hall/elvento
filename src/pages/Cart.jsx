import React, { useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import Navbar from "../components/Navbar";
import { products } from "../assets/asset";
import { Trash2 } from "lucide-react";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import empty from "../assets/emptytCart.jpg";

const Cart = () => {
  const { currency, cartItems, updateQuantity, getCartAmount } =
    useContext(AdContext);

  const [cartData, setCardData] = useState([]);
  const navigate = useNavigate();
  const verifyOrder = () => {
    if (getCartAmount() <= 0) {
      toast.error("Add Product to Cart");
    } else {
      navigate("/place-order");
    }
  };

  useEffect(() => {
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
    setCardData(tempData);
  }, [cartItems]);

  // const verifyOrder = () => {
  //   if (getCart){

  //   }
  // }

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
            const adData = products.find((ad) => ad.id === item.id);
            return (
              <div
                key={index}
                className="py-4 border-t border-b grid grid-cols-[4fr_0.5fr_0.5] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={adData.image[0]}
                    alt=""
                    className="w-16 sm:w-20 rounded"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {adData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {adData.price}
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
                <Trash2
                  className="cursor-pointer"
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
                className="bg-black text-white text-sm my-8 px-8 py-3 rounded cursor-pointer"
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
