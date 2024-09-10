import { useState, useContext } from 'react';
import { UserContext } from '../Authentication/UserContext';
import StarRating from './Star';

const ReviewAndRating = () => {
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [rating, setRating] = useState(1); // Use null instead of empty string for rating
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token] = useContext(UserContext);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hotel_id: hotelId, text: text, user_id: userId }),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/reviews', requestOptions);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.detail);
      } else {
        setSuccessMessage('Review submitted successfully!');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hotel_id: hotelId, rating: rating, user_id: userId }),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/hotel_ratings', requestOptions);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.detail);
      } else {
        setSuccessMessage('Rating submitted successfully!');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="review-box p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Write a Review and Rate</h3>
      <form onSubmit={handleReviewSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="user_id" className="block font-medium">User ID:</label>
          <input type="text" id="user_id" value={userId} onChange={(e) => setUserId(e.target.value)} className="input" />
        </div>
        <div className="mb-4">
          <label htmlFor="hotel_id" className="block font-medium">Hotel ID:</label>
          <input type="number" id="hotel_id" value={hotelId} onChange={(e) => setHotelId(e.target.value)} className="input" />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block font-medium">Review:</label>
          <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} className="input" />
        </div>
        <button type="submit" className="btn-primary">Submit Review</button>
      </form>
      <form onSubmit={handleRatingSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block font-medium">Rating:</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <button type="submit" className="btn-primary">Submit Rating</button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default ReviewAndRating;
