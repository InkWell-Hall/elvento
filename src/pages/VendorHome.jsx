import Sidebar from "../components/Sidebar";

const VendorHome = () => {
  const name = "Sidebar";
  return (
    <div className="flex">
      <Sidebar />
      <h1>Welcome to the vendor's Home</h1>
    </div>
  );
};

export default VendorHome;
