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
      <div className="font-manrope flex flex-col p-3 space-y-3 overflow-hidden rounded-lg shadow-sm border border-base-300 hover:border-gray-300 transition-all duration-500 ease-in-out text-base-content bg-base-100 group">
        <div className="flex space-x-4 pb-2 m-0 t ">
          <div className="w-12 h-12">
            <img
              alt=""
              src={photo}
              className="object-cover w-full h-full  rounded-full shadow bg-gray-500  "
            />
          </div>
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
            <p className="text-xs text-left  rounded-md inline-block  text-base-content bg-base-100 line-clamp-1">
              {location}
            </p>
          </div>
        </div>

        <div className="w-full h-40 rounded-lg">
          <img
            src={photo}
            alt="Posted image"
            className="object-cover object-center rounded-lg w-full h-full bg-gray-500"
          />
        </div>

        <div>
          <div className="flex flex-col justify-between ">
            <p className="flex-1 font-bold font-league">
              ৳ {rent}{" "}
              <span className="text-sm font-mono align-center">/month</span>
            </p>
            <h2 className="text-sm font-medium line-clamp-1 m-0 mb-3">
              {title}
            </h2>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-league py-1 px-3 border border-lime-400 rounded-lg">
              {roomType} Room
            </p>
            <p className="text-sm font-league py-1 px-3 border border-lime-400 rounded-lg ">
              {availability}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="space-x-2">
            <Link
              to={`/details/${_id}`}
              type="button"
              className="btn border border-gray-200 bg-transparent rounded-lg p-1 px-4 text-center  hover:bg-lime-400 transition-colors ease-in-out duration-300"
            >
              <span className="text-xs ">See Details</span>
            </Link>
          </div>
          <div className="flex space-x-2 text-sm text-gray-400 dark:text-gray-700 border border-gray-200 rounded-lg">
            <button
              type="button"
              className="flex items-center p-1 space-x-1.5 "
            >
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
