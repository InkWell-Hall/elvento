import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { products } from "../assets/asset";
// import { useNavigate } from "react-router";
import { apiClient } from "../api/client";

export const AdContext = createContext();
const AdContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [favoriteItems, setFavoriteItems] = useState({});
  const currency = "$";
  const [allAds, setAllAds] = useState([]);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const delivery_fee = 20;

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    const storedUserId = localStorage.getItem("USER_ID");

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

    setCartItems(cartData);

    try {
      await apiClient.post(
        "/cart/add",
        { itemId, size, userId: storedUserId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      toast.success("Product Added to Cart");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addToFavoriteWithToken = async (itemId, size) => {
    if (!itemId) {
      toast.error("Invalid product ID.");
      return;
    }

    toast.success("Product successfully added to Favorites");
    let FavoriteData = structuredClone(favoriteItems);

    if (FavoriteData[itemId]) {
      if (FavoriteData[itemId][size]) {
        FavoriteData[itemId][size] += 1;
      } else {
        FavoriteData[itemId][size] = 1;
      }
    } else {
      FavoriteData[itemId] = {};
      FavoriteData[itemId][size] = 1;
    }

    setFavoriteItems(FavoriteData);
  };
  const addToFavoriteWithoutToken = (itemId, size) => {
    if (!token) {
      toast.error("Please sign in to add items to favorites.");
      return;
    }

    try {
      toast.success("Item added to favorites!");
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const getAllAds = async () => {
    try {
      const response = await apiClient.get("/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      console.log(response.data.products);
      setAllAds(response.data.products || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
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
  const getFavoriteCount = () => {
    console.log("favoriteItems:", favoriteItems); // 👈 Add this
    let totalCount = 0;
    for (const items in favoriteItems) {
      for (const item in favoriteItems[items]) {
        try {
          if (favoriteItems[items][item] > 0) {
            totalCount += favoriteItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
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
      let itemInfo = allAds.find((ad) => ad.id === items);
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

  const getAllOrders = async () => {
    try {
      const response = await apiClient.get("/order/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserCart = async () => {
    try {
      let userId = localStorage.getItem("USER_ID");
      const response = await apiClient.get(
        `/get/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log(response);
      setCartItems(response.data.cartData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log(cartItems);
    console.log(getCartAmount());
    // getUserId();
    getAllAds();
    getUserCart();
    getAllOrders();
    console.log(token);
  }, []);
  const value = {
    addToCart,
    cartItems,
    getCartCount,
    currency,
    updateQuantity,
    delivery_fee,
    // navigate,
    getCartAmount,
    getFavoriteCount,
    addToFavoriteWithoutToken,
    // addToFavorite,
    favoriteItems,
    addToFavoriteWithToken,
    // userId,
    // setUserId,
    // getUserId,
    allAds,
  };
  return (
    <AdContext.Provider value={value}>{props.children}</AdContext.Provider>
  );
};

export default AdContextProvider;
