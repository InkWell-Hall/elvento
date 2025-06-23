import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiClient } from "../api/client";
import axios from "axios";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: " ",
    phoneNumber: "",
    role: "Buyer", // 'buyer' or 'seller'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState("signup"); // 'signup' or 'login'

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim() && currentView === "signup") {
      newErrors.userName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Phone validation for sellers only
    if (currentView === "signup" && formData.role === "Vendor") {
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required for Vendors";
      } else if (
        !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ""))
      ) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role,
      phone: role === "Buyer" ? "" : prev.phone, // Clear phone if switching to buyer
    }));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://elvento-api.onrender.com/api/V1/user/auth/signUp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem("ACCESS_TOKEN", response.data.data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (currentView === "signup") {
        const roleText = formData.role === "Vendor" ? "Vendor" : "Buyer";
        alert(
          `Welcome ${formData.userName}! Your ${roleText} account has been created successfully.`
        );
      } else {
        alert(`Welcome back! Logged in successfully as ${formData.role}.`);
      }

      // Reset form
      setFormData({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
        role: "buyer",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const switchView = (view) => {
    setCurrentView(view);
    setErrors({});
    setFormData({
      userName: "",
      email: "",
      password: "",
      phone: "",
      role: "buyer",
    });
  };

  const handleForgotPassword = () => {
    const email = prompt("Enter your email address:");
    if (email) {
      alert(`Password reset link sent to ${email}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12 min-h-[80vh]">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-800 mb-8 sm:mb-12 text-center">
            {currentView === "signup" ? "Sign Up —" : "Login —"}
          </h1>

          <div className="space-y-4 sm:space-y-6">
            {/* Role Selection - only show for signup */}
            {currentView === "signup" && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  I am a:
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("buyer")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.role === "buyer"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white bg-opacity-40 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M8 11v4a1 1 0 001 1h6a1 1 0 001-1v-4M8 11H7a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1v-8a1 1 0 00-1-1h-1"
                        />
                      </svg>
                      <span className="font-medium">Buyer</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("Vendor")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.role === "Vendor"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 bg-white bg-opacity-40 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="font-medium">Vnedor</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic role indicator for current form */}
            {currentView === "signup" && (
              <div className="text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    formData.role === "Vendor"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {formData.role === "Vendor"
                    ? "🏪 Vendor Registration"
                    : "🛒 Buyer Registration"}
                </span>
              </div>
            )}

            {/* Name field - always show for signup, different labels for buyer/seller */}
            {currentView === "signup" && (
              <div>
                <input
                  type="text"
                  name="userName"
                  placeholder={
                    formData.role === "Vendor"
                      ? "Business/Store Name"
                      : "Full Name"
                  }
                  value={formData.userName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 bg-white bg-opacity-40 border rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.name
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                )}
              </div>
            )}

            {/* Phone number field - only show for sellers during signup */}
            {currentView === "signup" && formData.role === "Vendor" && (
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number (+1234567890)"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 bg-white bg-opacity-40 border rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.phoneNumber
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
                <p className="text-xs text-gray-600 mt-1">
                  Required for customer contact and order management
                </p>
              </div>
            )}

            {/* Email field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 bg-white bg-opacity-40 border rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 pr-12 bg-white bg-opacity-40 border rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.password
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* ConfirmPassword field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 pr-12 bg-white bg-opacity-40 border rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.confirmpassword
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 text-sm underline transition-colors order-2 sm:order-1"
              >
                Forgot password?
              </button>

              <button
                type="button"
                onClick={() =>
                  switchView(currentView === "signup" ? "login" : "signup")
                }
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors order-1 sm:order-2"
              >
                {currentView === "signup" ? "Login" : "Sign Up"}
              </button>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-colors mt-6 sm:mt-8 flex items-center justify-center ${
                currentView === "signup" && formData.role === "Vendor"
                  ? "bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
                  : "bg-black hover:bg-gray-800 text-white disabled:bg-gray-400"
              } disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {currentView === "signup"
                    ? "Creating Account..."
                    : "Logging in..."}
                </>
              ) : (
                <>
                  {currentView === "signup"
                    ? formData.role === "Vendor"
                      ? "🏪 Create Vendor Account"
                      : "🛒 Create Buyer Account"
                    : "Login"}
                </>
              )}
            </button>

            {/* Role benefits info */}
            {currentView === "signup" && (
              <div className="mt-6 p-4 bg-white bg-opacity-30 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  {formData.role === "Vnedor"
                    ? "Vendor Benefits:"
                    : "Buyer Benefits:"}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.role === "Vendor" ? (
                    <>
                      <li>• Create and manage your store</li>
                      <li>• List unlimited products</li>
                      <li>• Direct customer communication</li>
                      <li>• Sales analytics and reporting</li>
                    </>
                  ) : (
                    <>
                      <li>• Browse thousands of products</li>
                      <li>• Secure payment processing</li>
                      <li>• Order tracking and history</li>
                      <li>• Customer support access</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
