import React, { useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { Filter } from "lucide-react";
import FilterSideBar from "../components/FilterSideBar";
import { Link } from "react-router";
import Footer from "../components/Footer";

const Curve = () => {
  const { allAds } = useContext(AdContext);
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
    console.log("filtered ads", filteredAds);
    console.log("Ads Data:", adData);
  }, [filters, searchQuery, adData]);

  const curve = allAds.filter((item) => item.category === "Curve");
  console.log(curve);
  return curve.length > 0 ? (
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
              {curve.length === 0 ? (
                <div className="text-center text-gray-500">No ads found</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {curve.map((ad) => (
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div>
        <h1>No Curve Items</h1>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Curve;
