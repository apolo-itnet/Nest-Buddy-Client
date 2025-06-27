import Aos from "aos";
import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import ListingCard from "../Components/ListingCard";
import { motion } from "framer-motion";
import { fadeIn, slideLeft, slideRight, slideUp } from "../Utility/Animation";
import { useEffect } from "react";
import { Search } from "lucide-react";
import useDebounce from "../Hooks/useDebounce";

const AllPosts = () => {
  const roomPosts = useLoaderData();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800);
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    setRooms(roomPosts);
  }, [roomPosts]);

  useEffect(() => {
    Aos.init({ duration: 500, once: false });
  }, []);

  const filteredPosts = useMemo(() => {
    return roomPosts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.location.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.rent.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchAvailability =
        !availability || post.availability === availability;

      return matchSearch && matchAvailability;
    });
  }, [roomPosts, debouncedSearch, availability]);

  return (
    <div className="w-full mx-auto responsive-padding text-base-content bg-base-100">
      <motion.div
        variants={fadeIn(0.3)}
        initial="initial"
        animate="animate"
        exit={"exit"}
        className="sticky top-20 z-50 px-4 bg-lime-400 rounded-lg flex items-center justify-between my-2"
      >
        <div className="flex gap-4 items-center ">
          <select
            onChange={(e) => setAvailability(e.target.value)}
            className="border border-base-100  px-3 py-1 rounded"
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
            <option value="Immediate">Immediate</option>
          </select>
        </div>

        <motion.h1
          variants={slideRight(0.4)}
          initial="initial"
          animate="animate"
          exit={"exit"}
          className="text-4xl text-center font-normal font-poetsen tracking-tighter py-4 hidden md:block"
        >
          All Room Posts
        </motion.h1>

        <div>
          <div className="overflow-hidden w-10 h-10 hover:w-80 bg-white rounded-full flex items-center hover:duration-300 duration-500 ease-out relative">
            <span className="absolute inset-0 w-10 h-10 flex items-center justify-center text-amber-400">
              <Search size={26} />
            </span>
            <input
              type="text"
              placeholder="Search by title or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 outline-none text-sm text-teal-800  bg-transparent w-full h-full font-normal px-4"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto py-6">
        {filteredPosts.map((room, index) => (
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
    </div>
  );
};

export default AllPosts;
