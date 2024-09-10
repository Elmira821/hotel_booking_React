import { useState, useContext } from "react";
import { UserContext } from "../Authentication/UserContext";
import PropTypes from 'prop-types';

const CreateHotel = ({ setActiveContent }) => {
  const [hotel_name, setHotel_name] = useState("hotel name");
  const [location, setLocation] = useState("location");
  const [room_number, setRoom_number] = useState("");
  const [bed_size, setBed_size] = useState("king");
  const [price, setPrice] = useState('0');
  const [available, setAvailable] = useState(true);
  const [available_dates, setAvailable_dates] = useState([]);
  const [image_url, setImage_url] = useState("imageUrl");
  const [image_url_type, setImage_url_type] = useState("absolute");
  const [description, setDescription] = useState("description");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); 
  const [token] = useContext(UserContext);

  const submitCreateHotel = async () => {
    setErrorMessage("");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include authentication token in headers
      },
      body: JSON.stringify({
        hotel_name: hotel_name,
        location: location,
        room_number: room_number,
        bed_size: bed_size,
        price: price,
        available: available,
        available_dates : available_dates,
        image_url: image_url,
        image_url_type: image_url_type,
        description: description,
      }),
    };

    try {
      const response = await fetch(`http://localhost:8000/hotels`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to create hotel");
      }
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitCreateHotel();
  };

  const handleClose = () => {
    setIsSuccess(false); 
    setActiveContent('home'); // Ensure 'home' is the correct target
    console.log("Active content set to 'home'"); // Confirm if this runs
  };

  return (
    <div className="w-4/5 h-4/5 flex center mt-8">
      <div className="bg-white shadow-md rounded-lg px-8 py-6"> 
        <h2 className="text-2xl font-semibold mb-4 mt-20">Create Hotel</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[
              { label: "Hotel Name", value: hotel_name, onChange: setHotel_name },
              { label: "Location", value: location, onChange: setLocation },
              { label: "Room Number", value: room_number, onChange: setRoom_number },
              { label: "Bed Size", value: bed_size, onChange: setBed_size },
              { label: "Price", value: price, onChange: setPrice },
              { label: "Availability", value: available, onChange: setAvailable },
              { label: "Available Dates", value: available_dates, onChange: setAvailable_dates },
              { label: "Add photo url", value: image_url, onChange: setImage_url },
              { label: "Type photo url", value: image_url_type, onChange: setImage_url_type },
              { label: "Description", value: description, onChange: setDescription },
            ].map((field, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4"> 
                <label className="w-full md:w-1/3 text-gray-700 text-sm font-medium">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full md:w-2/3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300" // Aligned left
          >
            Save Hotel
          </button>
        </form>
        {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
      </div>

      {isSuccess && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Hotel Created Successfully!</h2>
            <button
              onClick={handleClose}
              className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

CreateHotel.propTypes = {
  setActiveContent: PropTypes.func.isRequired,
};

export default CreateHotel;
