import React, { useState } from "react";
import { X, Filter, DollarSign, Tag, MapPin } from "lucide-react";

const categories = [
  "All Categories",
  "Kids",
  "Fashion",
  "Home & Garden",
  "Automotive",
  "Sports",
  "Health & Beauty",
  "Services",
  "Real Estate",
  "Jobs",
  "Other",
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

export default function FilterSideBar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...localFilters.priceRange];
    newPriceRange[index] = parseInt(value) || 0;
    handleFilterChange("priceRange", newPriceRange);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: "All Categories",
      priceRange: [0, 10000],
      location: "",
      sortBy: "newest",
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-80 lg:w-72 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filters
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
            </div>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="input-field"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          {/* <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Range
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="input-field text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={localFilters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="input-field text-sm"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
            </div>
          </div> */}

          {/* Sort By */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Sort By
            </label>
            <select
              value={localFilters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="input-field"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Price Filters */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Price Filters
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Under $50", range: [0, 50] },
                { label: "$50-$200", range: [50, 200] },
                { label: "$200-$500", range: [200, 500] },
                { label: "$500+", range: [500, 10000] },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleFilterChange("priceRange", option.range)}
                  className={`px-3 py-2 text-xs rounded-md border transition-colors ${
                    localFilters.priceRange[0] === option.range[0] &&
                    localFilters.priceRange[1] === option.range[1]
                      ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-400"
                      : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
