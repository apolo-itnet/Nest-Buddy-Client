import React from "react";
import Slider from "../Components/Slider";
import Testimonial from "../Components/Testimonial";
import ListingRoomSection from "../Components/ListingRoomSection";

const Home = () => {
  return (
    <div>
      <div>
        <Slider></Slider>
      </div>
      <div>
        <ListingRoomSection />
      </div>
      <div id="testimonial">
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;
