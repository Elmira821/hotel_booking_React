import { useState, useContext } from 'react';
import { UserContext } from '../Authentication/UserContext';
/* import { format } from 'date-fns'; // For date formatting */

const HotelBooking = () => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isConfirmed, ] = useState(true);
  const [token] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    const requestBody = {
      guest_name: guestName,
      guest_email: guestEmail,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      is_confirmed: isConfirmed,
      room_id: parseInt(roomId),
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include authentication token
      },
      body: JSON.stringify(requestBody), 
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/bookings/', requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book the hotel');
      }

      setSuccessMessage('Booking successful! A confirmation email has been sent.');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during booking.');
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-4/5 bg-white shadow-md rounded-lg px-8 py-6">
        <h2 className="text-2xl font-semibold mb-4">Book a Hotel</h2>
        <form onSubmit={handleBooking}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Guest Email</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Check-in Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Check-out Date</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Room ID</label>
              <input
                type="number"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Book Now
          </button>
        </form>
        {successMessage && (
          <div className="text-green-500 text-center mt-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default HotelBooking;