import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ListingCard from "./ListingCard";

const ListingRoomSection = () => {
  const listingsRooms = useLoaderData();
  console.log(listingsRooms);
  
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(listingsRooms);
  }, [listingsRooms]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-7xl mx-auto py-10 px-4">
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
