import { useState } from "react";
import PropTypes from 'prop-types';

const Star = ({ rating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(null);
  
    const handleMouseOver = (index) => {
      setHoveredRating(index);
    };
  
    const handleMouseOut = () => {
      setHoveredRating(null);
    };
  
    const handleClick = (index) => {
      onRatingChange(index + 1); // Add 1 to index since index starts from 0
    };
  
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{ cursor: 'pointer', color: index < (hoveredRating ?? rating) ? 'gold' : 'grey' }}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  Star.propTypes = {
    rating: PropTypes.number.isRequired,
    onRatingChange: PropTypes.func.isRequired
  };
  
  export default Star;