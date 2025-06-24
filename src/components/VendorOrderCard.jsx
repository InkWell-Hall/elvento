import { useState } from "react";
import asset3 from "../assets/image3.png";
import { Sidebar } from "lucide-react";

export default function VendorOrderCard({ image }) {
  const [status, setStatus] = useState("Packaging"); // Could be: 'Order Received', 'Packaging', 'Out for Delivery'

  const statusOptions = ["Order Received", "Packaging", "Out for Delivery"];
  return (
    <div className="w-190 mx-auto h-50 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 font-medium p-4 mt-20">
      <div className="">
          {/* <p className="text-sm"> Product Info</p> */}
          <div className="flex items-center space-x-4">
            <img
              src={asset3}
              alt="Product Image"
              className="w-25 h-30 object-cover rounded-md"
            />
            <div className="flex items-center gap-10 justify-between ">
            <div className=" flex-col">
              <h2 className="text-sm mt-6">Women Black Dinner || M </h2>
              <p className="text-sm text-gray-500 mt-5">Linia Aldo</p>
              <p className="text-sm text-gray-500">Ridge, Greater Accra Region,<br /> Ghana, 6789
              <br /> 0345567789</p>
              <div className="flex space-x-3 mt-1">
                
              </div>
            </div>
            <div className="flex-col text-gray-500">
              <h2 className="text-sm mt-8"><span className="text-black">Item:</span>1</h2>
              <h2 className=""><span className="text-black">ID:</span>fffhtt</h2>
              <p className="text-sm"><span className="text-black">Method:</span> COD <br /><span className="text-black">Payment:</span> Pending <br /><span className="text-black">Date:</span> 21/04/2025</p>
              <p className="text-sm mt-2 text-black bg-gray-100 px-2 py-1 rounded">
                Amount: $89.99
              </p>
            </div>
            <div className=" flex-col">
              <h3 className="text-sm mb-4">Set Tracking Status</h3>
              {/* Tracking Info */}
              <div className=" flex-col">
                {/* Select Dropdown for Vendor to update status */}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-gray-300 rounded px-3 mb-6 mr-15 py-2 text-sm text-gray-700"
                >
                  {statusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            </div>
          </div>
        </div>
        {/* <hr className="my-4" /> */}

        {/* Progress Bar UI */}
        {/* <div className="flex items-center justify-between text-center mt-6 text-sm text-gray-500">
          {statusOptions.map((step, index) => {
            const stepStatus =
              statusOptions.indexOf(status) > index
                ? 'done'
                : statusOptions.indexOf(status) === index
                ? 'current'
                : 'pending';

            const getDotColor = () => {
              if (stepStatus === 'done') return 'bg-green-500';
              if (stepStatus === 'current') return 'bg-yellow-400';
              return 'bg-gray-300';
            };

            return (
              <div className="flex flex-col items-center" key={step}>
                <div className={`h-4 w-4 rounded-full ${getDotColor()}`}></div>
                <span className={`mt-1 ${stepStatus === 'current' ? 'font-semibold text-gray-700' : ''}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div> */}
      </div>

  );
}