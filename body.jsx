import React, { useState } from 'react';
import './body.css'; // Make sure to import the CSS file

const RentalListing = () => {
  const [guests, setGuests] = useState(1);

  return (
    <div className="rental-listing">
    <div>
      <h1>Comfy New Apt. in Pueblo Libre!</h1>
      
      <div className="image-grid">
        <img src="/api/placeholder/800/600" alt="Main room" className="main-image" />
        <div className="secondary-images">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={`/api/placeholder/400/400?text=Image ${i + 2}`} alt={`Room ${i + 2}`} className="secondary-image" />
          ))}
        </div>
      </div>
    </div>
    <div>
      <div className="listing-details">
        <h2>Entire rental unit in Lima, Peru</h2>
        <p>2 guests · 1 bedroom · 1 bed · 1 bath</p>
        <span className="badge">★ New</span>
        
        <div className="host-info">
          <img src="data:image/jpeg;base64,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" alt="Host" className="host-avatar" />
          <div>
            <p><strong>Hosted by Fernando</strong></p>
            <p>Superhost · 7 years hosting</p>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">🔑</span>
            <div>
              <p><strong>Self check-in</strong></p>
              <p>Check yourself in with the smartlock.</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <div>
              <p><strong>Fernando is a Superhost</strong></p>
              <p>Superhosts are experienced, highly rated hosts.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="availability-form">
        <h3>Add dates for prices</h3>
        <div className="form-grid">
          <div className="form-field">
            <label>CHECK-IN</label>
            <input type="text" placeholder="Add date" />
          </div>
          <div className="form-field">
            <label>CHECKOUT</label>
            <input type="text" placeholder="Add date" />
          </div>
        </div>
        <div className="form-field">
          <label>GUESTS</label>
          <div className="guest-select">
            <span>{guests} guest</span>
            <span>▼</span>
          </div>
        </div>
        <button className="check-availability-btn">
          Check availability
        </button>
      </div>

      <div className="report-listing">
        <button className="report-btn">
          <span className="report-icon">🚩</span>
          Report this listing
        </button>
      </div>
    </div>
    </div>
  );
};

export default RentalListing;