import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './NavBar.css';

const regions = [
  { name: "I'm flexible", img: "https://media.istockphoto.com/id/936410448/vector/black-outlined-world-map.jpg?s=612x612&w=0&k=20&c=4NC6zyuo9Bcz6W9MBsUHbTTj5f4vP1JRpyKJL7mdEvY=" },
  { name: "Southeast Asia", img: "https://c8.alamy.com/comp/2C58G60/asean-economic-community-aec-map-grey-map-with-dark-gray-highlighted-member-countries-southeast-asia-vector-illustration-2C58G60.jpg" },
  { name: "Canada", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmebMhUa8hUtYB6kVF7A4BdANOgV3f34UjQ&s" },
  { name: "Europe", img: "https://thumbs.dreamstime.com/b/austria-map-black-white-detailed-outline-regions-country-austria-map-black-white-detailed-outline-regions-184772805.jpg" },
  { name: "Thailand", img: "https://cdn2.vectorstock.com/i/1000x1000/07/51/thailand-black-white-map-vector-950751.jpg" },
  { name: "Middle East", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0mvV0LzryT0eeiN2HQl-9JrsgX-dioT9Bg&s" }
];

const Header = () => {
  const [showDestinationSearch, setShowDestinationSearch] = useState(false);
  const [showRegionGrid, setShowRegionGrid] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('Search Destination');
  const destinationSearchRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [initialDate, setInitialDate] = useState(null);
  const [isSettingCheckIn, setIsSettingCheckIn] = useState(true);
  const [checkInRange, setCheckInRange] = useState(null);
  const [checkOutRange, setCheckOutRange] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false); // Added state for calendar visibility

  const toggleDestinationSearch = (e) => {
    e.preventDefault();
    setShowDestinationSearch(prevState => !prevState);
  };

  const handleWhereButtonClick = () => {
    setShowRegionGrid(prevState => !prevState);
  };

  const handleRegionClick = (regionName) => {
    setSelectedDestination(regionName);
    setShowRegionGrid(false);
  };

  const handleDateChange = (date) => {
    if (isSettingCheckIn) {
      setStartDate(date);
      setInitialDate(date);
      setIsSettingCheckIn(false); // Next click should set Check Out date
    } else {
      setEndDate(date);
      setIsSettingCheckIn(true); // Next click should set Check In date
    }
    // Do not close the calendar when a date is selected
  };

  const handleFlexibleRangeChange = (range) => {
    if (initialDate) {
      if (!endDate) {
        setCheckInRange(range);
        setStartDate(new Date(initialDate.getTime() + range * 24 * 60 * 60 * 1000));
      } else {
        setCheckOutRange(range);
        setEndDate(new Date(initialDate.getTime() + range * 24 * 60 * 60 * 1000));
      }
    }
  };

  const handleCheckInClick = () => {
    setIsSettingCheckIn(true);
    setCalendarVisible(!calendarVisible); // Toggle visibility
  };

  const handleCheckOutClick = () => {
    setIsSettingCheckIn(false);
    setCalendarVisible(!calendarVisible); // Toggle visibility
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destinationSearchRef.current && !destinationSearchRef.current.contains(event.target)) {
        setShowRegionGrid(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDateString = (date, range) => {
    if (!date) return 'Add dates';
    return `${date.toDateString()}${range !== null ? ` ±${range} days` : ''}`;
  };

  return (
    <div className='header-menu-container'>
      <nav>
        <div className="search-menu">
          <button onClick={toggleDestinationSearch}>Anywhere</button>
          <button onClick={toggleDestinationSearch}>Any week</button>
          <button onClick={toggleDestinationSearch}>Add guests</button>
          <button>
            <img
              src="https://cdn4.iconfinder.com/data/icons/web-icons-19/711/search-icon-tm-512.png"
              alt="Search"
            />
          </button>
        </div>
        <div className="user-menu">
          <img
            src="https://cdn2.iconfinder.com/data/icons/thin-line-icons-for-seo-and-development-1/64/SEO_international-512.png"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              marginLeft: '290px'
            }}
            alt="globe"
          />
          <button className="user-menu-button">
            <span className="menu-icon">☰</span>
            <img
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
              alt="User"
              className="user-icon"
            />
          </button>
        </div>
      </nav>
      <div className={`destination-search ${showDestinationSearch ? 'show' : ''}`} ref={destinationSearchRef}>
        <div className="navbar">
          <button className="navbar-item" onClick={handleWhereButtonClick}>
            Where<br /><span style={{ color: 'slategray' }}>{selectedDestination}</span>
          </button>
          <button className="navbar-item" onClick={handleCheckInClick}>
            Check in<br /><span style={{ color: 'slategray' }}>{formatDateString(startDate, checkInRange)}</span>
          </button>
          <button className="navbar-item" onClick={handleCheckOutClick}>
            Check out<br /><span style={{ color: 'slategray' }}>{formatDateString(endDate, checkOutRange)}</span>
          </button>
          <button className="navbar-item">
            Who<br /><span style={{ color: 'slategray' }}>Add guests</span>
          </button>
          <button className="search-button">Search</button>
        </div>
        <div className={`region-grid ${showRegionGrid ? 'show' : ''}`}>
          {regions.map((region, index) => (
            <div key={index} className="region-item" onClick={() => handleRegionClick(region.name)}>
              <img src={region.img} alt={region.name} style={{ width: '130px', height: '100px' }} />
              <span>{region.name}</span>
            </div>
          ))}
        </div>
      </div>

      {calendarVisible && (
        <div className="calendar-container">
          <DatePicker
            selected={isSettingCheckIn ? startDate : endDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsStart={isSettingCheckIn}
            selectsEnd={!isSettingCheckIn}
            inline
          />
          {startDate && (
            <div className="flexible-options">
              <button onClick={() => handleFlexibleRangeChange(0)}>Exact dates</button>
              <button onClick={() => handleFlexibleRangeChange(1)}>± 1 day</button>
              <button onClick={() => handleFlexibleRangeChange(2)}>± 2 days</button>
              <button onClick={() => handleFlexibleRangeChange(3)}>± 3 days</button>
              <button onClick={() => handleFlexibleRangeChange(7)}>± 7 days</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;