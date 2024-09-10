import { useState } from 'react';
import PropTypes from 'prop-types';

// Import images
import Amsterdam from '/Amsterdam.jpg';
import Delft from '/Delft.jpg';
import Eindhoven from '/Eindhoven.jpg';
import Maastricht from '/Maastricht.jpg';
import Rotterdam from '/Rotterdam.jpg';
import DenHaag from '/DenHaag.jpg';

// Define cities data
const cities = [
    { name: "Amsterdam", image: Amsterdam },
    { name: "Rotterdam", image: Rotterdam },
    { name: "The Hague", image: DenHaag },
    { name: "Delft", image: Delft },
    { name: "Eindhoven", image: Eindhoven },
    { name: "Maastricht", image: Maastricht },
];

const Featured = ({ onSearchResults }) => {
    const [, setHotels] = useState([]);
    
    const fetchHotels = (cityName) => {
        const queryParams = new URLSearchParams({
          location: cityName,
          // Add other parameters if needed (dates, number of guests, etc.)
        });
    
        fetch(`http://127.0.0.1:8000/hotels?${queryParams}`, {
          method: 'GET'
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch hotel locations');
            }
            return response.json();
          })
          .then((data) => {
            const results = data;
            setHotels(data);
            onSearchResults(results);
          })
          .catch((error) => {
            console.error('Error fetching hotel locations:', error);
          });
      };
    
      const handleImageClick = (cityName) => {
        fetchHotels(cityName);
      };

    // Chunk the hotels array into rows of three
    const chunkArray = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
            arr.slice(i * size, i * size + size)
        );

    const rows = chunkArray(cities, 3); // Change 'hotels' to 'cities' to chunk the cities array

    return (
      <div className="relative top-24 max-w-[2048px] m-8 bottom-24 flex flex-wrap justify-start">
          {rows.map((row, rowIndex) => (
              <div className="flex my-5 w-full justify-between gap-5" key={rowIndex}>
                  {row.map((city, index) => (
                      <div className="relative text-white cursor-pointer basis-[calc(33.333%-10px)]" key={index}>
                          <div className="relative" onClick={() => handleImageClick(city.name)}>
                              <img src={city.image} alt={city.name} className="w-full h-auto object-cover" />
                          </div>
                          <div className="absolute bottom-0 left-1 bg-black bg-opacity-50 w-[80%] h-[30%] p-1 rounded-bl-none rounded-br-lg">
                              <p>{city.name}</p>
                              {/* Add logic for displaying hotels here */}
                          </div>
                      </div>
                  ))}
              </div>
          ))}
      </div>
  );
}

Featured.propTypes = {
  onSearchResults: PropTypes.func.isRequired
};

export default Featured;