import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import stripe from "../assets/stripe_logo.png";
import { AdContext } from "../context/AdContext";
import Title from "../components/Ttitle";
import CartTotal from "../components/CartTotal";
import razorpay from "../assets/razorpay_logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiClient } from "../api/client";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD"); // Changed to uppercase

  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    allAds,
  } = useContext(AdContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Check if user is logged in
      const userId = localStorage.getItem("USER_ID");
      if (!userId) {
        toast.error("User not logged in");
        return;
      }

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              allAds.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Check if cart is not empty
      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      // Format address as string
      const addressString = `${formData.firstName} ${formData.lastName}, ${formData.street}, ${formData.city}, ${formData.state} ${formData.zipcode}, ${formData.country}. Phone: ${formData.phone}, Email: ${formData.email}`;

      let orderData = {
        address: addressString,
        items: orderItems,
        cart: orderItems,
        amount: getCartAmount() + delivery_fee,
        user: userId,
        paymentMethod: method, // Now using uppercase values
      };

      switch (method) {
        case "COD": // Changed to uppercase
          const response = await apiClient.post("/place", orderData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
          });

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order Placed Successfully");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "STRIPE": // Changed to uppercase
          const responseStripe = await apiClient.post("/stripe", orderData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
          });

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        <div className="flex justify-between w-[80%] mx-auto flex-col md:flex-row">
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
              <Title text1={"Delivery"} text2={"INFORMATION"} />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="First name"
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
              />
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Last name"
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
              />
            </div>
            <input
              type="email"
              required
              className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Email"
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
            <input
              type="text"
              required
              className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Street"
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            />
            <div className="flex gap-3">
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="City"
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
              />
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="State"
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
              />
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Zipcode"
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
              />
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Country"
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
              />
            </div>
            <input
              type="number"
              required
              className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Phone"
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>

          {/* Right side */}
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>

            <div className="mt-12">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
              <div className="flex gap-3 flex-col lg:flex-row">
                <div
                  onClick={() => setMethod("STRIPE")}
                  className="flex items-center gap-1 border p-2 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "STRIPE" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <img src={stripe} className="h-5 mx-0" alt="" />
                </div>
                <div
                  onClick={() => setMethod("RAZORPAY")}
                  className="flex items-center gap-1 border p-2 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "RAZORPAY" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <img src={razorpay} className="h-5 mx-0" alt="" />
                </div>
                <div
                  onClick={() => setMethod("COD")}
                  className="flex items-center gap-1 border p-2 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "COD" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <p className="text-gray-500 text-sm font-medium mx-0">
                    CASH ON DELIVERY
                  </p>
                </div>
              </div>

              <div className="w-full text-end mt-8">
                <button
                  type="submit"
                  className="text-white bg-black px-16 py-3 text-sm cursor-pointer"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PlaceOrder;
