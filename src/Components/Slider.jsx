import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";
import Aos from "aos";
import slides from "./SliderData";

// const slides = [
//   {
//     id: 1,
//     img: "https://i.postimg.cc/5NmfZV65/slider-1.jpg",
//     title: "",
//     heading: "",
//     description: "",
//   },
//   {
//     id: 2,
//     img: "https://i.postimg.cc/FHWNHVb7/slider-2.jpg",
//     title: "",
//     heading: "",
//     description: "",
//   },
//   {
//     id: 3,
//     img: "https://i.postimg.cc/XY7nWzCR/slider-3.jpg",
//     title: "",
//     heading: "",
//     description: "",
//   },

// ];

const Slider = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="relative h-[calc(100vh-90px)] w-full mx-auto top-2 flex justify-center items-center rounded-2xl overflow-hidden py-4 responsive-padding">
      <Swiper
        effect={"coverflow"}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative  ">

              {/* Image Section */}
              <div className="h-[calc(100vh-90px)] rounded-2xl overflow-hidden">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute w-full mx-auto rounded-2xl inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10" />
              </div>

              {/* Text Section */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white text-center px-4 font-cabin tracking-wide ">
                <h2
                  className="text-lg md:text-2xl font-bold uppercase mb-4"
                  data-aos="fade-down"
                >
                  {slide.title}
                </h2>
                <h1
                  className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 font-poetsen"
                  data-aos="fade-up"
                >
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-lg max-w-2xl" data-aos="fade-in">
                  {slide.description}
                </p>
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
