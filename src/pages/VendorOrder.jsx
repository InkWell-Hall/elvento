import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import VendorOrderCard from "../components/VendorOrderCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AdContext } from "../context/AdContext";
import { TableColumnsSplit } from "lucide-react";

const VendorOrder = () => {
  const { token } = useContext(AdContext);

  console.log(token);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <VendorOrderCard />

      <Footer />
    </div>
  );
};

export default VendorOrder;
