import React, { useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { Filter } from "lucide-react";
import FilterSideBar from "../components/FilterSideBar";
import { Link } from "react-router";
import { apiClient } from "../api/client";

const Kids = () => {
  const [adData, setAdData] = useState([]);
  const { search, allAds } = useContext(AdContext);

  const getAllAds = async () => {
    try {
      const response = await apiClient.get("/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      console.log("API Response:", response.data.products);
      setAdData(response.data.products || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setAdData([]); // fallback to empty array
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    category: "All Categories",
    subCategory: "",
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
      let results = [...adData]; // Create a copy to avoid mutation

      console.log("Starting filter with adData:", adData);
      console.log("Current filters:", filters);
      console.log("Search query:", search);

      // Apply search filter first (from context)
      if (search && search.trim()) {
        results = results.filter(
          (ad) =>
            ad.name?.toLowerCase().includes(search.toLowerCase()) ||
            ad.title?.toLowerCase().includes(search.toLowerCase()) ||
            ad.description?.toLowerCase().includes(search.toLowerCase())
        );
        console.log("After search filter:", results.length);
      }

      // Apply category filter
      if (filters.category && filters.category !== "All Categories") {
        results = results.filter((ad) => {
          // Check both 'category' and 'Category' fields (case variations)
          const adCategory = ad.category || ad.Category || "";
          return adCategory.toLowerCase() === filters.category.toLowerCase();
        });
        console.log("After category filter:", results.length);
      }

      // Apply subcategory filter
      if (filters.subCategory) {
        results = results.filter((ad) => {
          const adSubCategory =
            ad.subCategory || ad.subcategory || ad.SubCategory || "";
          return (
            adSubCategory.toLowerCase() === filters.subCategory.toLowerCase()
          );
        });
        console.log("After subcategory filter:", results.length);
      }

      // Apply price range filter
      if (filters.priceRange && filters.priceRange.length === 2) {
        results = results.filter((ad) => {
          const price = parseFloat(ad.price) || 0;
          return (
            price >= filters.priceRange[0] && price <= filters.priceRange[1]
          );
        });
        console.log("After price filter:", results.length);
      }

      // Apply location filter
      // if (filters.location && filters.location.trim()) {
      //   results = results.filter((ad) => {
      //     const adLocation = ad.location || ad.city || ad.address || "";
      //     return adLocation
      //       .toLowerCase()
      //       .includes(filters.location.toLowerCase());
      //   });
      //   console.log("After location filter:", results.length);
      // }

      // Apply sorting
      if (filters.sortBy) {
        results = results.sort((a, b) => {
          switch (filters.sortBy) {
            case "newest":
              // Assuming there's a date field, otherwise use createdAt or _id
              const dateA = new Date(a.createdAt || a.date || a._id);
              const dateB = new Date(b.createdAt || b.date || b._id);
              return dateB - dateA;

            case "oldest":
              const oldDateA = new Date(a.createdAt || a.date || a._id);
              const oldDateB = new Date(b.createdAt || b.date || b._id);
              return oldDateA - oldDateB;

            case "price-low":
              return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);

            case "price-high":
              return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);

            case "popular":
              // Assuming there's a views or popularity field
              return (
                (b.views || b.popularity || 0) - (a.views || a.popularity || 0)
              );

            default:
              return 0;
          }
        });
        console.log("After sorting:", results.length);
      }

      console.log("Final filtered results:", results);
      setFilteredAds(results);
    };

    runFilter();
  }, [filters, search, adData]); // Include search in dependencies

  // Debug: Log sample ad structure
  useEffect(() => {
    if (adData.length > 0) {
      console.log("Sample ad structure:", adData[0]);
      console.log("Available fields:", Object.keys(adData[0]));
    }
  }, [adData]);

  const kids = allAds.filter((item) => item.category === "kids");
  console.log("kids:", kids);
  return kids.length > 0 ? (
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
              <FilterSideBar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Ads Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"></div>

              {/* Ads Display */}
              {kids.length === 0 ? (
                <div className="text-center text-gray-500">No ads found</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {kids.map((ad) => (
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
  ) : (
    <div>
      <h1>No Kid's Items</h1>
    </div>
  );
};

export default Kids;
