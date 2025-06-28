import React, { useState } from "react";
import {
  User,
  Phone,
  FileText,
  CreditCard,
  Edit3,
  X,
  Check,
  Search,
  ChevronDown,
  Bell,
  Mail,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Main Vendor Profile Component
const VendorProfile = () => {
  const [currentView, setCurrentView] = useState("view"); // 'view' or 'edit'

  // Sample vendor data - replace with your API data
  const [vendorData, setVendorData] = useState({
    companyName: "Golden Events Co.",
    phoneNumber: "+233 123 456 789",
    email: "goldenevemts@gmail.com",
    bio: "We are a premier event decoration and catering service provider specializing in weddings, corporate events, and private parties. We offer full-service event planning with attention to detail.",
    accountNumber: "VEN-2024-001",
  });

  const handleEditClick = () => {
    setCurrentView("edit");
  };

  const handleSaveChanges = (newData) => {
    setVendorData(newData);
    setCurrentView("view");
    // Here you would also make API call to save data
    console.log("Saving data:", newData);
  };

  const handleCancel = () => {
    setCurrentView("view");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen w-490 md:ml-50 bg-[#E7EFC7]">
        {/* <Navbar /> */}
        <nav className=" flex justify-between items-center text-black bg-black/40 backdrop:blur-2xl  fixed w-282 right-0 vendnav h-15">
          <div className="realtive ml-5">
            <input
              type="text"
              className="w-full border border-white pl-7 rounded-2xl py-1 outline-none font-bold font-lead-font "
              placeholder="search"
            />
            <Search className="absolute top-5 ml-2" size={18} />
          </div>

          <div className="flex gap-6 justify-between items-center">
            <div className="flex bg-gray-50 px-2 py-2 rounded-full relative border border-blue-950 cursor-pointer">
              <Bell />
              <span className=" absolute right-2 bg-yellow-700 text-orange-500 w-2 h-2 rounded-full"></span>
            </div>
            <span className="bg-black text-white py-3 px-3 font-lead-font font-bold rounded-full">
              MC
            </span>
            <div className="flex mr-4">
              <h1 className="font-bold vendortag1 text-white ">Vendor</h1>
            <ChevronDown className="cursor-pointer font-bold mt-0.5"color="white" />
            </div>
          </div>
        </nav>
        {currentView === "view" ? (
          <ProfileView vendorData={vendorData} onEditClick={handleEditClick} />
        ) : (
          <ProfileEdit
            vendorData={vendorData}
            onSave={handleSaveChanges}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

// Profile View Component
const ProfileView = ({ vendorData, onEditClick }) => {
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 mt-6">
            My Business Profile
          </h1>
          <p className="text-gray-600">
            Manage your advertising profile on Elvento
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-yellow-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User
                  className="w-12 h-12 md:w-16 md:h-16 text-blue-600"
                  color="#4b6382"
                />
              </div>
              <div className="text-center md:text-left text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {vendorData.companyName}
                </h2>
                <p className="text-blue-100 text-sm md:text-base">
                  Advertising Partner on Elvento
                </p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Phone Number */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#23723b]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Phone Number
                  </h3>
                  <p className="text-gray-600 break-all">
                    {vendorData.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-[#da6691]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Account Number
                  </h3>
                  <p className="text-gray-600 break-all">
                    {vendorData.accountNumber}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-[#a85dda]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600 break-all">{vendorData.email}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {/* <CreditCard className="w-6 h-6 text-green-600" /> */}
                  <Mail className="w-6 h-6 text-[#b33813]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600 break-all">{vendorData.email}</p>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-8">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#8d5609]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Business Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {vendorData.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="text-center">
              <button
                onClick={onEditClick}
                className="inline-flex items-center gap-2 bg-yellow-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Edit Component
const ProfileEdit = ({ vendorData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...vendorData });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName?.trim()) {
      newErrors.companyName = "Business name is required";
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.accountNumber?.trim()) {
      newErrors.accountNumber = "Account number is required";
    }

    if (!formData.bio?.trim()) {
      newErrors.bio = "Business description is required";
    } else if (formData.bio.trim().length < 50) {
      newErrors.bio = "Business description should be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        onSave(formData);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Edit Business Profile
          </h1>
          <p className="text-gray-600">
            Update your advertising profile information
          </p>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business/Company Name *
              </label>
              <input
                type="text"
                value={formData.companyName || ""}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your business name"
                disabled={isLoading}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber || ""}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
                disabled={isLoading}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Account Number *
              </label>
              <input
                type="text"
                value={formData.accountNumber || ""}
                onChange={(e) =>
                  handleInputChange("accountNumber", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.accountNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter account number"
                disabled={isLoading}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.accountNumber}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Description *
              </label>
              <textarea
                value={formData.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your business and services..."
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.bio && (
                  <p className="text-red-500 text-sm">{errors.bio}</p>
                )}
                <p className="text-gray-400 text-sm ml-auto">
                  {formData.bio?.length || 0} characters
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-yellow-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default VendorProfile;
