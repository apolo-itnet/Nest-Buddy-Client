import React from "react";
import { Link } from "react-router";
import { BiSolidLike } from "react-icons/bi";
import { GoEye } from "react-icons/go";


const ListingCard = ({ room, rooms, setRooms }) => {
  const {
    _id,
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
    isoTime,
    timeZone,
    views,
    likes,
    createdAt,
  } = room;

  return (
    <div>
      <div className="font-manrope flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-xs border border-base-200 hover:border-lime-300 transition-colors duration-500 ease-in-out text-base-content bg-base-100">
        <div className="flex space-x-4">
          <img
            alt=""
            src={photo}
            className="object-cover w-12 h-12 rounded-full shadow bg-gray-500 dark:bg-gray-500"
          />
          <div className="flex flex-col space-y-1">
            <p
              rel="noopener noreferrer"
              href="#"
              className="text-sm font-semibold"
            >
              {first_name} {last_name}
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {localTime}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 px-0">
          <div className="w-full h-60 rounded-lg">
            <img
              src={photo}
              alt="Posted image"
              className="object-cover object-center rounded-lg w-full h-full mb-4 bg-gray-500 dark:bg-gray-500"
            />
          </div>

          <div>
            <p className="text-lg font-bold font-league">৳{rent} <span className="text-sm font-mono align-bottom">/month</span></p>
            <h2 className="mb-1 text-md font-semibold">{title}</h2>
            <div className="flex justify-between items-center gap-2">
              <p className="text-md font-medium font-league">
              {roomType}
            </p>
              <p className="text-md font-medium font-league ">
              {availability}
            </p>
            </div>
            <p className="text-sm  rounded-md px-3 py-1 inline-block  text-base-content bg-base-100">{location}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="space-x-2">
            <Link
              to={`/details/${_id}`}
              aria-label="see more details"
              type="button"
              className="btn p-1 px-4 text-center"
            >
              See more
            </Link>
          </div>
          <div className="flex space-x-2 text-sm text-gray-400 dark:text-gray-600">
            <button type="button" className="flex items-center p-1 space-x-1.5">
              <span>
                <BiSolidLike />
              </span>
              <span>{likes ? likes : 0}</span>
            </button>
            <button type="button" className="flex items-center p-1 space-x-1.5">
              <span>
                <GoEye />
              </span>
              <span>{views ? views : 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
