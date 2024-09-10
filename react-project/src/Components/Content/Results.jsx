import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Star from "../Reviews/Star";
import ShowRouteButton from "../UserProfile/ShowRouteButton";
import  Detail  from "./Detail";

const BASE_URL = "http://localhost:8000";

const Results = ({ searchResults, setActiveContent }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedResult, setSelectedResult] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  const handleDetailClick = (result) => {
    setShowDetail(true); // Show detail view
    setSelectedResult(result); // Store selected result
  };

  const clearFilters = () => {
    // Clear all filter values
    setMinPrice("");
    setMaxPrice("");
    // Reset more filter states here
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const urls = searchResults.map((results) => {
        if (results.image_url_type === "absolute") {
          return results.image_url;
        } else {
          return BASE_URL + results.image_url;
        }
      });
      setImageUrls(urls);
      setFilteredResults(searchResults);
    }
  }, [searchResults]);

  useEffect(() => {
    // Filter results based on min and max price
    const filtered = searchResults.filter((result) => {
      const price = result.price;
      return (
        (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
      );
    });
    setFilteredResults(filtered);
  }, [searchResults, minPrice, maxPrice]);

  const handleFilterChange = () => {
    // Apply filter when filter values change
    setMinPrice(Math.max(0, minPrice));
    setMaxPrice(Math.max(0, maxPrice));
  };

  const calculateAverageRating = (ratings) => {
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return ratings.length > 0 ? totalRating / ratings.length : 0;
  };

  const buttonClass =
    "w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition";

  return (
    <section className="flex items-start mt-[80rem]">
      {/* Left side: Filter */}
      <div className="w-1/4 bg-gray-100 p-4 " style={{ minHeight: "250vh" }}>
        <p
          className="FilterTitle"
          style={{
            marginBottom: "1rem",
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Filter by:
        </p>

        <div className="flex flex-col mb-4 p-2rem mt-8">
          <label>Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handleFilterChange}
          />

          <label>Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handleFilterChange}
          />

          <label>Star</label>
          <Star />

          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Right side: Results */}
      <div className="w-3/4 flex flex-wrap justify-center p-4">
        {filteredResults.map((results, index) => (
          <div
            className="flex items-center w-full border border-gray-300 rounded-md p-2 mb-5"
            key={index}
          >
            <div className="w-1/3 pr-4">
              <img
                className="max-w-full rounded-md"
                src={imageUrls[index]}
                alt={`Room ${index}`}
              />
            </div>
            <div className="w-2/3 flex flex-col">
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold mr-2">{results.hotel_name}</h2>
                <div className="RatingsContainer">
                  <p className="RatingTitle" style={{ fontWeight: "bold" }}>
                    {" "}
                  </p>
                  {results.ratings.map((rating, ratingIndex) => (
                    <div key={ratingIndex}>
                      <Star rating={rating.rating} />
                    </div>
                  ))}
                  <span>{calculateAverageRating}</span>
                </div>
              </div>
              <div className="HotelInfo">
                <p>
                  <span className="font-bold">Price:</span> € {results.price}
                </p>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {results.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <ShowRouteButton destination={location} className={buttonClass} />
              <button
                className={buttonClass}
                onClick={() => handleDetailClick(results)}
              >
                Detail
              </button>
              <button
                className={buttonClass}
                onClick={() => setActiveContent("bookings")}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {showDetail && selectedResult && <Detail result={selectedResult} />}
    </section>
  );
};

Results.propTypes = {
  searchResults: PropTypes.array.isRequired,
  setActiveContent: PropTypes.func.isRequired,
};

export default Results;
