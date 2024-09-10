import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faSearch, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';

const SearchBar = ({ onSearchResults }) => {
  const [location, setLocation] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [openPersonOptions, setOpenPersonOptions] = useState(false);
  const [, setHotels] = useState([]);
  const searchBarRef = useRef(null);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchBarRef.current &&
      !searchBarRef.current.contains(event.target)) {
      setOpenDate(false);
      setOpenPersonOptions(false);
    }
  };

  const fetchHotels = () => {
    const queryParams = new URLSearchParams({
      location: location,
      
      // Add other parameters if needed (dates, number of guests, etc.)
    });

    fetch(`http://localhost:8000/hotels/?${queryParams}`, {
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

  const handleSearch = () => {
    fetchHotels();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchHotels();
    }
  };

  const handleChange = (value) => {
    setLocation(value);
  };

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="flex items-center justify-around p-2.5 bg-white border-3 border-[#103346] rounded-md relative top-0 w-full max-w-[1024px] left-50 border border-solid border-gray-300" ref={searchBarRef}>
        <div className="flex items-center gap-2.5">
          <FontAwesomeIcon icon={faSearch} className="text-gray-300" />
          <input type="text"
            placeholder='Choose your destination'
            className="border-none outline-none"
            value={location}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <FontAwesomeIcon icon={faCalendarDays} className="text-gray-300" />
          <span onClick={() => {
            setOpenDate(!openDate);
            setOpenPersonOptions(false);
          }} className="text-gray-300 cursor-pointer">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}
          </span>
          {openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="absolute top-[50px] z-20"
          />}
        </div>

        <div className="flex items-center gap-2.5">
          <FontAwesomeIcon icon={faPerson} className="text-gray-300" />
          <span onClick={() => {
            setOpenPersonOptions(!openPersonOptions);
            setOpenDate(false);
          }} className="text-gray-300 cursor-pointer">
            {`${options.adult} adult, ${options.children} children, ${options.room} room`}
          </span>
          {openPersonOptions && <div className="absolute top-[50px] z-20 bg-white text-gray-500 rounded-md shadow-sm">
            <div className="w-[200px] flex justify-between m-2.5">
              <span className="text-gray-300 cursor-pointer">Adult</span>
              <div className="flex items-center gap-2.5 text-sm text-black">
                <button
                  disabled={options.adult <= 1}
                  className="w-7.5 h-7.5 border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white" onClick={() => handleOption("adult", "d")}>-</button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button className="w-7.5 h-7.5 border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white" onClick={() => handleOption("adult", "i")}>+</button>
              </div>
            </div>
            <div className="w-[200px] flex justify-between m-2.5">
              <span className="text-gray-300 cursor-pointer">Children</span>
              <div className="flex items-center gap-2.5 text-sm text-black">
                <button
                  disabled={options.children <= 0}
                  className="w-7.5 h-7.5 border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white" onClick={() => handleOption("children", "d")}>-</button>
                <span className="optionCounterNumber">{options.children}</span>
                <button className="w-7.5 h-7.5 border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white" onClick={() => handleOption("children", "i")}>+</button>
              </div>
            </div>
            <div className="w-[200px] flex justify-between m-2.5">
              <span className="text-gray-300 cursor-pointer">Room</span>
              <div className="flex items-center gap-2.5 text-sm text-black">
                <button
                  disabled={options.room <= 1}
                  className="w-7.5 h-7.5 border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white" onClick={() => handleOption("room", "d")}>-</button>
                <span className="optionCounterNumber">{options.room}</span>
                <button className="w-7.5 h-7.5 border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white" onClick={() => handleOption("room", "i")}>+</button>
              </div>
            </div>
          </div>}
        </div>
        <div className="flex items-center gap-2.5">
          <button className="bg-[#103346] text-white font-medium border-none p-2.5 cursor-pointer" onClick={handleSearch}>Search</button>    
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearchResults: PropTypes.func.isRequired
};

export default SearchBar;
