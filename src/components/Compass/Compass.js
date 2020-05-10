import React from 'react';

const Compass = ({ direction, speed }) => (
  <div className="compass">
    <div className="direction">
      <p>
        {direction}
        <span>{speed} km/h</span>
      </p>
    </div>
    <div className={`arrow ${direction.toLowerCase()}`}></div>
  </div>
);

export default Compass;
