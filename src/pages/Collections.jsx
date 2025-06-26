import React, { useState, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import FilterSidebar from "../components/FilterSideBar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { apiClient } from "../api/client";
import { Link } from "react-router";

const mockAds = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    category: "Phones",
    location: "Accra",
    price: 7000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "GadgetHub",
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Dell XPS 13",
    category: "Laptops",
    location: "Kumasi",
    price: 9000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "TechStore",
    createdAt: "2024-06-03T12:00:00Z",
  },
  {
    id: 3,
    title: "Samsung Galaxy S22",
    category: "Phones",
    location: "Takoradi",
    price: 6000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "Mobiles Ghana",
    createdAt: "2024-06-05T15:00:00Z",
  },
  {
    id: 4,
    title: "Used Toyota Corolla",
    category: "Vehicles",
    location: "Accra",
    price: 45000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "Car Dealer",
    createdAt: "2024-06-02T09:00:00Z",
  },
  {
    id: 5,
    title: "Used Toyota Corolla",
    category: "Vehicles",
    location: "Accra",
    price: 45000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "Car Dealer",
    createdAt: "2024-06-02T09:00:00Z",
  },
  {
    id: 6,
    title: "Used Toyota Corolla",
    category: "Vehicles",
    location: "Accra",
    price: 45000,
    status: "approved",
    image:
      "https://img.freepik.com/free-photo/smiling-couple-viewing-pictures-camera_53876-14440.jpg",
    vendorName: "Car Dealer",
    createdAt: "2024-06-02T09:00:00Z",
  },
  // ... repeat for others
];

export default function Collections() {
  const [adData, setAdData] = useState([]);
  const getAllAds = async () => {
    try {
      const response = await apiClient.get("/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      console.log(response.data.products);
      setAdData(response.data.products || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setAdData(mockAds); // fallback to mock data
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, _setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    subCategory: "topwear",
    priceRange: [0, 100000],
    location: "",
    sortBy: "newest",
  });
  const [filteredAds, setFilteredAds] = useState([]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  useEffect(() => {
    getAllAds();
  }, []);

  useEffect(() => {
    const runFilter = () => {
      let results = adData;

      if (filters.category !== "All Categories") {
        results = results.filter((ad) => ad.category === filters.category);
      }

      results = results.filter(
        (ad) =>
          ad.price >= filters.priceRange[0] && ad.price <= filters.priceRange[1]
      );

      if (filters.location) {
        results = results.filter((ad) =>
          ad.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (searchQuery) {
        results = results.filter((ad) =>
          ad.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredAds(results);
    };
    runFilter();
    console.log(filteredAds);
    console.log(adData);
  }, [filters, searchQuery, adData]);

  return (
    <section>
      <Navbar />
      <div className="min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Ads Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                {/* <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div> */}
              </div>

              {/* Ads Display */}
              {filteredAds.length === 0 ? (
                <div className="text-center text-gray-500">No ads found</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAds.map((ad) => (
                    <Link to={`ad/${ad.id}`}>
                      <Card
                        key={ad.id}
                        discount={0}
                        image={ad.image[0]}
                        oldPrice={40}
                        price={ad.price}
                        title={ad.name}
                        id={ad.id}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* {filteredAds.map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))} */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
