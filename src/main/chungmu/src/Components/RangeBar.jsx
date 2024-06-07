import React from 'react';
import '../css/RangeBar.css';

const RangeBar = ({ max, value, onChange }) => {
  const backgroundStyle = {
    background: `linear-gradient(to right, #E83C3C ${value / max * 100}%, #ccc ${value / max * 100}%)`
  };

  return (
    <input
      type="range"
      min="0"
      max={max}
      value={value}
      onChange={onChange}
      style={backgroundStyle}
      className="styled-range-input"
    />
  );
};

export default RangeBar;
