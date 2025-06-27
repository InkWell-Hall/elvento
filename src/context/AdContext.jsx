import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/asset";
import { useNavigate } from "react-router";
import { apiClient } from "../api/client";

export const AdContext = createContext();
const AdContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [favoriteItems, setFavoriteItems] = useState({});
  const currency = "$";
  // const [userId, setUserId] = useState("");
  const [allAds, setAllAds] = useState([]);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const delivery_fee = 20;
  // const navigate = useNavigate();
  //   const navigate = useNavigate();
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    } else {
      toast.success("Product Added to Cart");
    }
    const storedUserId = localStorage.getItem("USER_ID");

    if (!storedUserId) {
      toast.error("Please log in to add items to cart");
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

    // if (size) {
    //   toast.success("Product added to cart successfully!");
    // }
    setCartItems(cartData);

    // if (token) {
    //   try {
    //     await apiClient.post(
    //       "/cart/add",
    //       { itemId, size, userId: storedUserId },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    //         },
    //       }
    //     );
    //     toast.success("Product Added to Cart");
    //   } catch (error) {
    //     console.log(error);
    //     toast.error(error.message);
    //   }
    // }
  };

  // const getUserId = () => {
  //   setUserId(localStorage.getItem("USER_ID"));
  // };
  const addToFavorite = async (itemId, size) => {
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

  // const handleSubmit = async () => {
  //   if (!validateForm()) return;
  //   setIsLoading(true);
  //   try {
  //     const response = await apiClient.post("/auth/signUp", formData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(response);
  //     localStorage.setItem("ACCESS_TOKEN", response.data.token);
  //     setUserId(response.data.user.id);
  //     if (formData.role === "Vendor") {
  //       navigate("/vendor-dashboard");
  //     } else {
  //       navigate("/");
  //     }

  //     setFormData({
  //       userName: "",
  //       email: "",
  //       password: "",
  //       phoneNumber: "",
  //       confirmPassword: "",
  //       role: "",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
    // getUserId();
    getAllAds();
    console.log(token);
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
    getFavoriteCount,
    addToFavorite,
    favoriteItems,
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
