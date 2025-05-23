import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { FaWifi, FaSnowflake, FaUtensils, FaBath, FaShieldAlt } from "react-icons/fa";
import AmenityIcon from "../Components/amenityIcons";

const RoomDetails = () => {
  const roomInfo = useLoaderData();
  const {
    email,
    first_name,
    last_name,
    title,
    location,
    rent,
    lifestyle,
    roomType,
    availability,
    contact,
    photo,
    amenities,
    description,
    localTime,
    updatedAt,
    _id,
  } = roomInfo;

  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [showContact, setShowContact] = useState(false);

  // Fetch view count and increment on page load
  // useEffect(() => {
  //   fetch(`http://localhost:5000/listingsRooms/views/${_id}`, { method: "POST" })
  //     .then((res) => res.json())
  //     .then((data) => setViews(data.views));
  // }, [_id]);

  // Fetch like count on page load
  useEffect(() => {
    fetch(`http://localhost:5000/listingsRooms/likes/${_id}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes));
  }, [_id]);

  // Handle like button click
  const handleLike = () => {
    setLikes(likes + 1);
    setShowContact(true);
    fetch(`http://localhost:5000/listingsRooms/likes/${_id}`, { method: "POST" });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-poetsen text-center py-6">Room Details</h1>
      <div className="flex justify-end items-center space-x-6 font-medium py-4">
        <p>Posted: {localTime}</p>
        <p className="px-4 border-x border-x-gray-300">Update: {updatedAt || "Not updated yet"}</p>
        <p>Post Views: {views}</p>
      </div>

      <div className="max-w-6xl h-80 mx-auto rounded-2xl overflow-hidden mb-6">
        <img src={photo} alt="" className="w-full h-full object-cover object-center" />
      </div>

      <div className="font-manrope flex justify-between items-start gap-10">
        {/* Right side */}
        <div className="w-2/3">
          <p className="font-league font-semibold text-3xl">
            {first_name}'s Place in -{" "}
            <span className="hover:underline decoration-1 underline-lime-500 cursor-pointer text-gray-600">
              {location}
            </span>
          </p>

          <div className="py-6 border-b border-gray-300">
            <table className="table">
              <tbody className="text-base font-semibold font-manrope">
                <tr>
                  <th className="px-0 py-0 text-gray-500">RENT</th>
                  <td className="px-0 py-2">
                    {rent} TK <span className="text-xs align-bottom">/month</span>
                  </td>
                </tr>
                <tr>
                  <th className="px-0 py-0 text-gray-500">ROOM TYPE</th>
                  <td className="px-0 py-2">{roomType}</td>
                </tr>
                <tr>
                  <th className="px-0 py-0 text-gray-500">AVAILABLE</th>
                  <td className="px-0 py-2">{availability}</td>
                </tr>
                <tr>
                  <th className="px-0 py-0 text-gray-500">ADVANCED</th>
                  <td className="px-0 py-2">
                    {rent} TK <span className="text-xs align-bottom">/month</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="py-6 border-b border-gray-300">
            <p className="font-league font-semibold text-2xl uppercase">Description</p>
            <p className="text-justify leading-8">{description}</p>
          </div>

          <div className="py-6 border-b border-gray-300">
            <p className="font-league font-semibold text-2xl uppercase">Life Style</p>
            <p className="text-justify leading-8">{lifestyle}</p>
          </div>

          <div className="py-6 border-b border-gray-300">
            <p className="font-league font-semibold text-2xl uppercase">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <AmenityIcon key={index} amenity={amenity} />
              ))}
            </div>
          </div>
        </div>

        {/* Left side */}
        <aside className="sticky top-24 w-1/3">
          <div className="border border-gray-300 bg-gray-50 rounded-2xl p-4 mb-4">
            <p className="font-league font-semibold text-xl uppercase border-b border-gray-300 py-2 mb-3">
              Posted By
            </p>
            <div className="flex justify-start items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover object-center" />
              </div>
              <div>
                <p className="font-semibold text-md">
                  {first_name} {last_name}
                </p>
                <p className="text-xs text-gray-50">{email}</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <button
              onClick={handleLike}
              className="btn bg-lime-500 hover:bg-lime-600 text-white transition-colors duration-300 w-full"
            >
              Like Post <span className="like-count font-medium">{likes}</span>
            </button>
            {showContact && <p className="contact-show font-medium pt-2">Contact: {contact}</p>}
            <p className="text-xs text-center pt-1">
              TIP: If you like this post, see the contact details
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RoomDetails;