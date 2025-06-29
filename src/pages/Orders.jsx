import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
// import { products } from "../assets/asset";
import { AdContext } from "../context/AdContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency } = useContext(AdContext);
  const [allAds, setAllAds] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [adId, setAdId] = useState("");
  const token = localStorage.getItem("ACCESS_TOKEN");

  const getAllAds = async () => {
    try {
      const response = await apiClient.get("/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      console.log(response.data.products);
      setAllAds(response?.data?.products);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await apiClient.get("/order/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const orders = response.data.orders;
        const allOrdersItem = [];

        orders.forEach((order) => {
          order.items.forEach((itemObj) => {
            const productId = Object.keys(itemObj)[0];
            const sizes = itemObj[productId];

            const product = allAds?.find((p) => p.id === productId); // ✅ Use `_id` not `id`
            if (product) {
              Object.entries(sizes).forEach(([size, quantity]) => {
                allOrdersItem.push({
                  ...product,
                  size,
                  quantity,
                  status: order.status,
                  payment: order.payment,
                  paymentMethod: order.paymentMethod,
                  date: order.date,
                });
              });
            }
          });
        });

        setOrderData(allOrdersItem.reverse());
        toast.success("Order Tracked and Updated Successfully");
      }
    } catch (error) {
      console.error(
        "Order fetch error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAllAds(); // loads once when component mounts
  }, [token]);

  useEffect(() => {
    if (allAds.length > 0) {
      loadOrderData(); // only loads once ads are ready
    }
  }, [allAds]);

  useEffect(() => {
    console.log("MY ORDER DATA:", orderData);
  }, [allAds]);
  return (
    <>
      <Navbar />
      <div className="border-t pt-16 w-[80%] mx-auto">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div>
          {orderData?.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">{item.date}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
                  onClick={loadOrderData}
                >
                  Track order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
