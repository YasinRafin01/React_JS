import React, { useState, useEffect, useRef } from 'react';
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(true);
  const datePickerRef = useRef(null);


  const toggleDestinationSearch = (e) => {
    e.preventDefault();
    console.log('toggleDestinationSearch called', showDestinationSearch);
    setShowDestinationSearch(prevState => !prevState);
    setShowRegionGrid(false);
  };

  const handleWhereButtonClick = () => {
    console.log('handleWhereButtonClick called');
    setShowRegionGrid(prevState => !prevState);
    
  };

  const handleRegionClick = (regionName) => {
    console.log('handleRegionClick called with:', regionName);
    setSelectedDestination(regionName);
    setShowRegionGrid(false);
   
  };
  const handleCheckInClick = () => {
    setIsCheckIn(true);
    setShowDatePicker(true);
  };

  const handleCheckOutClick = () => {
    setIsCheckIn(false);
    setShowDatePicker(true);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destinationSearchRef.current && !destinationSearchRef.current.contains(event.target)) {
        //setShowDestinationSearch(false);
        setShowRegionGrid(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log('Render - showDestinationSearch:', showDestinationSearch);
  console.log('Render - showRegionGrid:', showRegionGrid);


  // handling clicking calender
  useEffect(() => {
    const datePicker = datePickerRef.current;
    const datePickerBody = datePicker.querySelector('#datePickerBody');
    const prevMonth = datePicker.querySelector('#prevMonth');
    const nextMonth = datePicker.querySelector('#nextMonth');
    const dateRangeOptions = datePicker.querySelectorAll('.date-range-option');
    
    let currentDate = new Date();
    let selectedCheckIn = null;
    let selectedCheckOut = null;
    let isDatePickerVisible = false;
    let selectedDateRangeOption = "";

    const toggleDatePicker = () => {
      isDatePickerVisible = !isDatePickerVisible;
      datePicker.style.display = isDatePickerVisible ? 'block' : 'none';
      if (isDatePickerVisible) {
        renderCalendar();
      }
    };

    const renderCalendar = () => {
      datePickerBody.innerHTML = '';
      const months = [getCurrentMonthDays(), getNextMonthDays()];

      months.forEach((month, index) => {
        const monthElement = document.createElement('div');
        monthElement.className = 'month';

        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = new Date(currentDate.getFullYear(), currentDate.getMonth() + index).toLocaleString('default', { month: 'long', year: 'numeric' });
        monthElement.appendChild(monthHeader);

        const weekdaysElement = document.createElement('div');
        weekdaysElement.className = 'weekdays';
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
          const dayElement = document.createElement('div');
          dayElement.textContent = day;
          weekdaysElement.appendChild(dayElement);
        });
        monthElement.appendChild(weekdaysElement);

        const daysElement = document.createElement('div');
        daysElement.className = 'days';
        month.forEach(day => {
          const dayElement = document.createElement('div');
          if (day) {
            dayElement.textContent = day.getDate();
            dayElement.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event bubbling
              selectDate(day);
            });
            if (isDateSelected(day)) {
              dayElement.classList.add('selected');
            }
          } else {
            dayElement.classList.add('empty');
          }
          daysElement.appendChild(dayElement);
        });
        monthElement.appendChild(daysElement);

        datePickerBody.appendChild(monthElement);
      });
    };

    const getCurrentMonthDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      const days = new Array(42).fill(null);

      for (let i = 0; i < lastDate; i++) {
        days[i + firstDay] = new Date(year, month, i + 1);
      }

      return days;
    };

    const getNextMonthDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      const days = new Array(42).fill(null);

      for (let i = 0; i < lastDate; i++) {
        days[i + firstDay] = new Date(year, month, i + 1);
      }

      return days;
    };

    const selectDate = (date) => {
      if (!selectedCheckIn) {
        selectedCheckIn = date;
        selectedCheckOut = null;
      } else if (selectedCheckIn && !selectedCheckOut) {
        if (selectedCheckIn.getTime() === date.getTime()) {
          selectedCheckIn = null;
        } else {
          selectedCheckOut = date;
          if (selectedCheckOut < selectedCheckIn) {
            [selectedCheckIn, selectedCheckOut] = [selectedCheckOut, selectedCheckIn];
          }
        }
      } else if (selectedCheckIn && selectedCheckOut) {
        if (selectedCheckOut.getTime() === date.getTime()) {
          selectedCheckOut = null;
        } else if (selectedCheckIn.getTime() === date.getTime()) {
          selectedCheckIn = null;
        } else {
          selectedCheckIn = date;
          selectedCheckOut = null;
        }
      }

      updateCheckInText();
      updateCheckOutText();
      renderCalendar();
    };

    const isDateSelected = (date) => {
      return (selectedCheckIn && date.getTime() === selectedCheckIn.getTime()) ||
             (selectedCheckOut && date.getTime() === selectedCheckOut.getTime());
    };

    const updateCheckInText = () => {
      const timeElement = document.getElementById("time");
      timeElement.textContent = selectedCheckIn ? formatDate(selectedCheckIn) + selectedDateRangeOption : 'Add date';
    };

    const updateCheckOutText = () => {
      const timeElement1 = document.getElementById("time1");
      timeElement1.textContent = selectedCheckOut ? formatDate(selectedCheckOut) + selectedDateRangeOption : 'Add date';
    };

    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    dateRangeOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        dateRangeOptions.forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedDateRangeOption = e.target.getAttribute('data-days');
        if (!selectedCheckOut) {
          updateCheckInText();
        } else {
          updateCheckOutText();
        }
      });
    });

    prevMonth.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    nextMonth.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    // Cleanup function to remove event listeners
    return () => {
      dateRangeOptions.forEach(option => option.removeEventListener('click', handleDateRangeOptionClick));
      prevMonth.removeEventListener('click', handlePrevMonthClick);
      nextMonth.removeEventListener('click', handleNextMonthClick);
    };
  }, [showDatePicker]);



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
      {showDestinationSearch && (
        <div className={`destination-search ${showDestinationSearch ? 'show' : ''}`} ref={destinationSearchRef}>
          <div className="navbar">
            <button className="navbar-item" onClick={handleWhereButtonClick}>
              Where<br /><span style={{ color: 'slategray' }}>{selectedDestination}</span>
            </button>
            <button className="navbar-item" onClick={handleCheckInClick}>
              Check in<br /><span id="time" style={{ color: 'slategray' }}>Add Dates</span>
            </button>
            <button className="navbar-item" onClick={handleCheckOutClick}>
              Check out<br /><span id="time1" style={{ color: 'slategray' }}>Add Dates</span>
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
      )}
      {showDatePicker && (
        <div className="date-picker" ref={datePickerRef}>
          <div className="date-picker-header">
            <div>
              <button className="date-range-option" data-days="">Exact dates</button>
              <button className="date-range-option" data-days="±1">± 1 day</button>
              <button className="date-range-option selected" data-days="±2">± 2 days</button>
              <button className="date-range-option" data-days="±3">± 3 days</button>
              <button className="date-range-option" data-days="±7">± 7 days</button>
            </div>
          </div>
          <div className="button-container">
            <button id="prevMonth" className="styled-button">Previous</button>
            <button id="nextMonth" className="styled-button">Next</button>
          </div>
          <div className="date-picker-body" id="datePickerBody"></div>
        </div>
      )}

      

    </div>
  );
};

export default Header;