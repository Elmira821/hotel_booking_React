import PropTypes from 'prop-types';

const ShowRouteButton = ({ destination }) => {
  const handleShowRoute = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(googleMapsUrl, '_blank'); // Opens in a new tab/window
  };

  return (
    <button
      onClick={handleShowRoute}
      className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-indigo-700"
    >
      Show Route
    </button>
  );
};

ShowRouteButton.propTypes = {
    destination: PropTypes.string.isRequired,
};

export default ShowRouteButton;