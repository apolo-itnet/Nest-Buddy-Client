import React from "react";
import { FaWifi, FaSnowflake, FaUtensils, FaBath, FaShieldAlt, FaFan, FaArrowUp, FaCouch, FaDoorOpen, FaCar, FaPlug } from 'react-icons/fa';

const amenityIcons = {
  "AC": <FaFan />,
  "Lift": <FaArrowUp />,
  "Wi-Fi": <FaWifi />,
  "Geyser": <FaPlug />,
  "Furnished": <FaCouch />,
  "Balcony": <FaDoorOpen />,
  "Fridge": <FaSnowflake />,
  "Kitchen Access": <FaUtensils />,
  "Attached Bathroom": <FaBath />,
  "Parking": <FaCar />,
  "Generator": <FaPlug />,
  "Security Guard": <FaShieldAlt />,
};

const AmenityIcon = ({ amenity }) => {
  return (
    <div className="bg-gray-100 rounded-lg border border-gray-200 p-2 text-sm flex items-center gap-2 px-5 btn ">
      {amenityIcons[amenity] || <span className="text-lime-500">Icon</span>}
      <span className="text-md font-medium">{amenity}</span>
    </div>
  );
};

export default AmenityIcon;