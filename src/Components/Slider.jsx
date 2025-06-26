import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slides from "./SliderData";
import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";
import Aos from "aos";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";
import { FaArrowDown } from "react-icons/fa6";
import PrimaryBtn from "../Shared/Button/PrimaryBtn";

const Slider = () => {
  const scrollToUpcoming = () => {
    const section = document.getElementById("latest-post");
    section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="relative w-full h-[80vh] mx-auto flex justify-center items-center overflow-hidden group">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        speed={2000}
        centeredSlides={true}
        navigation={{
          nextEl: ".slide-button-next",
          prevEl: ".slide-button-prev",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex justify-center items-center">
              {/* Text Section */}
              <div className="absolute inset-0 z-20  w-full mx-auto flex flex-col justify-center items-center text-white text-center px-4 font-cabin tracking-wide">
                <h2 className="text-lg md:text-2xl font-bold uppercase mb-4">
                  {slide.title}
                </h2>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 font-poetsen">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-lg max-w-2xl">
                  {slide.description}
                </p>

                <PrimaryBtn
                  onClick={scrollToUpcoming}
                  label="Scroll Down"
                  img={
                    <FaArrowDown
                      size={18}
                      className="animate-bounce"
                    />
                  }
                  className="mt-4 py-6"
                />
              </div>

              {/* Image Section */}
              <div className="relative w-full h-[80vh] overflow-hidden z-10">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute w-full mx-auto inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10" />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="slide-button-prev rounded-full relative lg:absolute top-60  w-10 h-10 flex justify-center items-center border border-lime-400 text-white hover:bg-lime-500 group-hover:left-0 -left-10 duration-300 ease-in-out transition-all z-50 cursor-pointer">
          <ArrowLeft />
        </div>
        <div className="slide-button-next rounded-full relative lg:absolute top-60  w-10 h-10 flex justify-center items-center border border-lime-400 text-white hover:bg-lime-500 group-hover:right-0 -right-10 duration-300 ease-in-out transition-all z-50 cursor-pointer">
          <ArrowRight />
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
