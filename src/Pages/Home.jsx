import React from "react";
import Slider from "../Components/Slider";
import Testimonial from "../Components/Testimonial";
import ListingRoomSection from "../Components/ListingRoomSection";
import HowItWorks from "../Components/HowItWorks";
import NewsLetter from "../Components/NewsLetter";

const Home = () => {
  return (
    <div>
      <div>
        <Slider></Slider>
      </div>
      <div id="latest-post">
        <ListingRoomSection />
      </div>
      <div id="testimonial">
        <Testimonial />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div id="newsletter">
        {" "}
        <NewsLetter />{" "}
      </div>
    </div>
  );
};

export default Home;
