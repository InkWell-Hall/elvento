import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/asset";
import { useNavigate } from "react-router";

export const AdContext = createContext();
const AdContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const currency = "$";
  const delivery_fee = 20;
  // const navigate = useNavigate();
//   const navigate = useNavigate();
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    if (size) {
      toast.success("Product added to cart successfully!");
    }
    setCartItems(cartData);

    // if (token) {
    //   try {
    //     await axios.post(
    //       backendUrl + "/api/cart/add",
    //       { itemId, size },
    //       { headers: { token } }
    //     );
    //     toast.success("Product Added to Cart");
    //   } catch (error) {
    //     console.log(error);
    //     toast.error(error.message);
    //   }
    // }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((ad) => ad.id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }

    return totalAmount;
  };
  useEffect(() => {
    console.log(cartItems);
    console.log(getCartAmount());
  }, [cartItems]);
  const value = {
    addToCart,
    cartItems,
    getCartCount,
    currency,
    updateQuantity,
    delivery_fee,
    // navigate,
    getCartAmount,
  };
  return (
    <AdContext.Provider value={value}>{props.children}</AdContext.Provider>
  );
};

export default AdContextProvider;
