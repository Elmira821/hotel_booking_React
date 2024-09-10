import PropTypes from 'prop-types';

const Sidebar = ({ setActiveContent }) => {
    const sidebarButtonClass = "w-full px-4 py-2 mt-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300";
  
    return (
      <div className="w-1/4 h-full bg-gray-100 p-6">
        <button className={sidebarButtonClass} onClick={() => setActiveContent("createHotel")}>
          Add a Hotel
        </button>
        <button className={sidebarButtonClass}>
          Edit a Hotel
        </button>
        <button className={sidebarButtonClass} onClick={() => setActiveContent("ReviewAndRating")}>
          Rate & Review a Hotel
        </button>
        <button className={sidebarButtonClass}>
          Modify a Rating or Review
        </button>
      </div>
    );
  };

  Sidebar.propTypes = {
    setActiveContent: PropTypes.func.isRequired,
  }
  
  export default Sidebar;