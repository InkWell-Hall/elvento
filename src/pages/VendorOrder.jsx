import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VendorNavbar from "../components/VendorNavbar";
import Sidebar from "../components/Sidebar";
import { apiClient } from "../api/client";
import parcel from "../assets/parcel.png";
import { AdContext } from "../context/AdContext";

const VendorOrder = () => {
  const [orders, setOrders] = useState([]);
  const { currency } = useContext(AdContext);
  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchAlOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await apiClient.get("/order/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAlOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(respsonse.data.message);
    }
  };

  useEffect(() => {
    fetchAlOrders();
    console.log(orders);
  }, []);
  return (
    <>
      {/* Top Navigation */}
      <VendorNavbar />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {" "}
        {/* Adjust if your navbar isn't 64px tall */}
        {/* Sidebar */}
        <div className="w-[250px] border-r border-gray-200">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Order Page</h3>

          {orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-sm text-gray-700"
            >
              <img src={parcel} className="w-12" />

              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="py-0.5">
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}

                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p>Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p>
                {currency}: {order.amount}
              </p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold border rounded"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorOrder;
