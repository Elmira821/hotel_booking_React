import  { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Detail = ({ result }) => {
    const [, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:8000/hotels');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                setHotels(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <p><span className="font-bold">Availability:</span> {result.available ? 'Available' : 'Not Available'}</p>
                    <p><span className="font-bold">Bed Size:</span> {result.bed_size}</p>
                    <p><span className="font-bold">Room Number:</span> {result.room_number}</p>
                    <div className="ReviewsContainer">
                        <p className="ReviewTitle" style={{ fontWeight: "bold" }}>Reviews:</p>
                        {result.reviews.length > 0 ? (
                            result.reviews.map((review, index) => (
                                <p className="mt-1.5" key={index}>{review.text}</p>
                            ))
                        ) : (
                            <p>No reviews available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
Detail.propTypes = {
    result: PropTypes.shape({
        available: PropTypes.bool.isRequired,
        bed_size: PropTypes.string.isRequired,
        room_number: PropTypes.string.isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

export default Detail;