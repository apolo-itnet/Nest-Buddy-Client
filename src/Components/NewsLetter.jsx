import React from "react";
import PrimaryBtn from "../Shared/Button/PrimaryBtn";

const NewsLetter = () => {
  return (
    <div className="max-w-5xl mx-auto flex justify-center items-center gap-10 font-league my-10 py-10 bg-p-color  rounded-xl responsive-padding ">
      <div className="w-1/3 hidden md:block ">
        <img
          src="https://i.postimg.cc/tCt1LvH8/Envelope.gif"
          alt=""
          className="w-full rounded-2xl"
        />
      </div>

      <div>
        <p className="text-lg font-semibold pt-color ">DON'T MISS ANY UPDATE</p>
        <h1 className="text-4xl text-lime-400 font-bold tracking-wider">NEWSLETTER</h1>
        <p className="w-2/3 py-3 pt-color">
          Get daily update on new listing room posts and more in your mailbox.
        </p>
        <div className="relative flex">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            className="py-3 px-4 block w-full pt-color bg-white border border-gray-200   focus:border-lime-500 focus:ring-lime-500 focus:outline-none"
            required
          />
          <PrimaryBtn label="Subscribe" type="submit" className="absolute right-0 py-6.5 rounded-l-none" />
        </div>
        <p className="py-2 text-gray-400">Don't worry, Your email is safe with us, we don't spam</p>
      </div>
    </div>
  );
};

export default NewsLetter;
