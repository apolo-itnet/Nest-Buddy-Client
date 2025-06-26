import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import ListingCard from "./ListingCard";
import { motion } from "framer-motion";
import { slideLeft, slideRight, slideUp } from "../Utility/Animation";
import Aos from "aos";

const ListingRoomSection = () => {
  const listingsRooms = useLoaderData();

  const [filteredRooms, setFilteredRooms] = useState(false);
  const displayRooms = filteredRooms
    ? listingsRooms
    : listingsRooms.slice(0, 8);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(displayRooms);
  }, [listingsRooms, filteredRooms]);

  useEffect(() => {
    Aos.init({ duration: 500, once: false });
  }, []);

  return (
    <div className="w-full mx-auto responsive-padding text-base-content bg-base-100  my-20 ">
      <div
        variants={slideUp(1)}
        initial="initial"
        animate="animate"
        viewport={{ once: false }}
        exit={"exit"}
        className="py-4 bg-lime-400"
      >
        <motion.h1
          variants={slideRight(1)}
          initial="initial"
          animate="animate"
          viewport={{ once: false }}
          exit={"exit"}
          className="text-4xl text-center font-normal font-poetsen tracking-tighter py-4 "
        >
          Latest Post Rooms
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto py-10">
        {rooms.map((room, index) => (
          <ListingCard
            key={room._id}
            room={room}
            rooms={rooms}
            setRooms={setRooms}
            data-aos="fade-in"
            data-aos-delay={index * 100}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/browse-listing"
          className="inline-flex justify-center items-center gap-2 text-sm font-semibold px-4 py-3 bg-lime-400 rounded-md  hover:bg-lime-500 transition-colors duration-300"
        > 
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default ListingRoomSection;
