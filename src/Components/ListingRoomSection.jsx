import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ListingCard from "./ListingCard";

const ListingRoomSection = () => {
  const listingsRooms = useLoaderData();
  
  const [filteredRooms, setFilteredRooms] = useState(false);
  const  displayRooms = filteredRooms ? listingsRooms : listingsRooms.slice(0,6);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(displayRooms);
  }, [listingsRooms, filteredRooms]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto py-10 responsive-padding text-base-content bg-base-100">
        {rooms.map((room) => (
          <ListingCard
            key={room._id}
            room={room}
            rooms={rooms}
            setRooms={setRooms}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingRoomSection;
