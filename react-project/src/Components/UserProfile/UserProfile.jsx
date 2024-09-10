import { useState, useContext } from "react";
import { UserContext } from "../Authentication/UserContext";
import Sidebar from "./SideBar";
import PropTypes from 'prop-types';

const UserProfile = ({ setActiveContent }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token] = useContext(UserContext);
  const [isSuccess, setIsSuccess] = useState(false); 

  const submitEditProfile = async () => {
    setErrorMessage("");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include authentication token in headers
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        phone_number: phoneNumber,
        gender: gender,
        date_of_birth: dateOfBirth,
        address: address,
      }),
    };

    try {
      const response = await fetch(`http://localhost:8000/users`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to update profile");
      }
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitEditProfile();
  };

  const handleClose = () => {
    setIsSuccess(false); 
    setActiveContent('home'); // Ensure 'home' is the correct target
    console.log("Active content set to 'home'"); // Confirm if this runs
  };

  return (
    <div  className="w-full h-full flex">
      <Sidebar setActiveContent={setActiveContent} />
      <div className="w-3/4 bg-white shadow-md rounded-lg px-8 py-6"> 
        <h2 className="text-2xl font-semibold mb-4 mt-20">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[
              { label: "Username", value: username, onChange: setUsername },
              { label: "Email", value: email, onChange: setEmail },
              { label: "Password", value: password, onChange: setPassword },
              { label: "Phone Number", value: phoneNumber, onChange: setPhoneNumber },
              { label: "Gender", value: gender, onChange: setGender },
              { label: "Date of Birth", value: dateOfBirth, onChange: setDateOfBirth },
              { label: "Address", value: address, onChange: setAddress },
            ].map((field, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4"> {/* Flex layout */}
                <label className="w-full md:w-1/3 text-gray-700 text-sm font-medium">{field.label}</label> {/* Label with flexible width */}
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
            Save Profile
          </button>
        </form>
        {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
      </div>
      {isSuccess && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Profile updated successfully!</h2>
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

UserProfile.propTypes = {
  setActiveContent: PropTypes.func.isRequired,
}

export default UserProfile;
