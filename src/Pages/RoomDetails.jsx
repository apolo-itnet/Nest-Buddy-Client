import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import { BiSolidLike } from "react-icons/bi";
import { GoEye } from "react-icons/go";
import AmenityIcon from "../Components/amenityIcons";
import { AuthContext } from "../Context/AuthContext";

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

  const { user } = useContext(AuthContext);
  const isOwnPost = user?.email === email;

  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    fetch(`https://roommates-finder-server-six.vercel.app/users/email/${email}`)
      .then((res) => res.json())
      .then((data) => setMongoUser(data));
  }, [email]);

  useEffect(() => {
    fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/views/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, [_id]);

  useEffect(() => {
    fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/likes/${_id}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes));
  }, [_id]);

  const handleLike = () => {
    setLikes(likes + 1);
    setShowContact(true);
    fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/likes/${_id}`, {
      method: "POST",
    });
  };

  return (
    <div className="w-full mx-auto responsive-padding">
      <h1 className="text-3xl font-poetsen text-center py-6">Room Details</h1>

      <div className="flex justify-end items-center  md:space-x-6 font-medium py-4 text-xs md:text-sm ">
        <p className=" flex-1 md:flex-none">Posted: <br className="md:hidden" /> {localTime}</p>
        <p className="px-4 flex-1 md:flex-none border-x border-x-gray-300">
          Update: <br className="md:hidden"/> {updatedAt || "Not updated yet"}
        </p>
        <p className="flex flex-1 md:flex-none items-center gap-2"> <span className="text-lime-600"><span className="hidden md:block"><GoEye size={18} /></span></span> Post Views: {views} <span className="text-lime-600"><GoEye size={18} /></span></p>
      </div>

      <div className="w-full h-80 mx-auto mb-6">
        <img
          src={photo}
          alt=""
          className="w-full h-full object-cover object-center rounded-2xl"
        />
      </div>

      <div className="font-manrope flex flex-col md:flex-row justify-between items-start gap-10">

        <div className="w-full md:w-2/3">

          <p className="font-league font-semibold text-3xl">
            {first_name}'s Place in -{" "}
            <span className="hover:underline decoration-1 underline-lime-500 cursor-pointer text-gray-600">
              {location}
            </span>
          </p>

          <div className="py-6 border-b border-gray-300">
            <p className="text-lg font-medium font-manrope py-3 capitalize ">
              {title} :{" "}
            </p>
            <table className="table w-xs">
              <tbody className="text-base font-semibold font-manrope ">
                <tr>
                  <th className="px-0 py-0 text-gray-500">RENT</th>
                  <td className="px-0 py-2">
                    {rent} TK{" "}
                    <span className="text-xs align-bottom">/month</span>
                  </td>
                </tr>
                <tr>
                  <th className="px-0 py-0 text-gray-500">ROOM TYPE</th>
                  <td className="px-0 py-2">{roomType}</td>
                </tr>
                <tr>
                  <th className="px-0 py-0 text-gray-500">AVAILABLE OR NOT</th>
                  <td className="px-0 py-2">{availability}</td>
                </tr>
                <tr>
                  <th className="px-0 py-0 text-gray-500">ADVANCED</th>
                  <td className="px-0 py-2">
                    {rent} TK{" "}
                    <span className="text-xs align-bottom">/month</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="py-6 border-b border-gray-300">
            <p className="font-league font-semibold text-2xl uppercase">
              Description
            </p>
            <p className="text-justify leading-8">{description}</p>
          </div>

          <div className="py-6 border-b border-gray-300">
            <p className="font-league font-semibold text-2xl uppercase">
              Life Style
            </p>
            <p className="text-justify leading-8">{lifestyle}</p>
          </div>

          <div className="py-6 border-b border-gray-300">
            <p className="font-league font-semibold text-2xl uppercase">
              Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <AmenityIcon key={index} amenity={amenity} />
              ))}
            </div>
          </div>
        </div>

        <aside className="sticky top-24 w-full md:w-1/3">
          <div className="border border-gray-300 bg-gray-50 rounded-2xl p-4 mb-4">
            <p className="font-league font-semibold text-xl uppercase border-b border-gray-300 py-2 mb-3">
              Posted By
            </p>
            <div className="flex justify-start items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={mongoUser?.photo}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-semibold text-md">
                  {first_name} {last_name}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <button
              onClick={handleLike}
              // disabled={isOwnPost}
              className={`btn text-white transition-colors duration-300 w-full flex justify-between 
              ${
                isOwnPost
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-lime-600 hover:bg-lime-500"
              }`}
            >
              <span className="font-manrope font-medium">Like Post</span>
              <span className="like-count text-base font-medium flex items-center gap-2">
                <BiSolidLike size={18} /> {likes}
              </span>
            </button>

            {showContact && !isOwnPost && (
              <p className="contact-show font-manrope font-medium py-2 text-center">
                Contact: {contact}
              </p>
            )}

            {isOwnPost ? (
              <p className="text-sm text-center pt-1 text-red-500 py-2">
                You cannot like your own post...
              </p>
            ) : (
              <p className="text-xs text-center pt-1">
                TIP: If you like this post, see the contact details
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RoomDetails;
