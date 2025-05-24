import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

// testimonials data assume here
const testimonials = [
  {
    id: 1,
    quote: `This site helped me find a roommate within 3 days!
The whole process was smooth, and I love the clean design.
We’ve already signed the lease together.`,
    rating: 4.9,
    name: "Rakib Hasan",
    designation: "Student, Dhaka University",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote: `আমি একটা trusted female roommate খুঁজছিলাম অনেকদিন ধরে।
এই ওয়েবসাইট থেকে পেয়েছি।
User profiles verify করা যায়, তাই খুবই safe মনে হয়েছে।`,
    rating: 4.8,
    name: "Mim Chowdhury",
    designation: "Intern, Software Company",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    quote: `I was shifting to Chattogram and didn’t know anyone.
This app saved my time and mental stress.
Matched with a roommate who also works in tech!`,
    rating: 5.0,
    name: "Siam Rahman",
    designation: "Junior Developer",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: 4,
    quote: `একটা সুন্দর UI এবং filter system থাকার কারণে আমার পছন্দমতো রুমমেট খুঁজে পেয়েছি।
Thanks for this amazing platform.`,
    rating: 4.7,
    name: "Nusrat Jahan",
    designation: "Freelancer & Artist",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    id: 5,
    quote: `Room cost, location, gender preference – সব কিছু sort করে roommate খোঁজা অনেক সহজ হয়েছে।`,
    rating: 4.9,
    name: "Tanvir Mahmud",
    designation: "Masters Student, BUET",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    id: 6,
    quote: `I loved the email verification system.
It helps avoid fake users.
Already recommended it to 3 of my friends!`,
    rating: 5.0,
    name: "Lamia Sultana",
    designation: "Medical Student",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
  },
  {
    id: 7,
    quote: `জব করার সময় roommate খোঁজা খুব কষ্টকর ছিল।
এই ওয়েবসাইটের notification system খুবই helpful হয়েছে।`,
    rating: 4.6,
    name: "Arif Chowdhury",
    designation: "Call Center Agent",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: 8,
    quote: `Great experience!
I liked the real-time chat feature.
Met my new roommate through here and she’s awesome!`,
    rating: 4.8,
    name: "Rumi Akter",
    designation: "Fashion Designer",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    id: 9,
    quote: `Filter by budget option saved me from expensive rent offers.
It’s like Tinder for roommates 😄.`,
    rating: 4.7,
    name: "Mahin Rahman",
    designation: "YouTuber & Video Editor",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    id: 10,
    quote: `সব রুম পোস্টে প্রপার ফটো এবং লোকেশন দেওয়া ছিল,
যার কারণে decision নেওয়া সহজ হয়েছে।`,
    rating: 4.8,
    name: "Sharmin Nahar",
    designation: "Graphic Designer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 11,
    quote: `আমি একজন international student, roommate খোঁজাটা ছিল challenge.
এই প্ল্যাটফর্ম আমার জন্য blessing!`,
    rating: 5.0,
    name: "John Kevin",
    designation: "Exchange Student, NSU",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
  },
  {
    id: 12,
    quote: `যারা নতুন শহরে move করে, তাদের জন্য এটা perfect।
Review system দেখে আমি ভাল roommate নির্বাচন করতে পেরেছি।`,
    rating: 4.9,
    name: "Raisa Tamanna",
    designation: "NGO Volunteer",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

const Testimonial = () => {
  const [selectedId, setSelectedId] = useState(testimonials[0].id);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14 text-base-content bg-base-100 ">
        <div className="flex flex-col lg:flex-row gap-4">

          <div>
            <Swiper
              style={{
                "--swiper-pagination-color": "#84cc16",
                "--swiper-pagination-bullet-inactive-opacity": "0.03",

              }}
              modules={[Autoplay, Pagination]}
              pagination = {{ 
                clickable: true,
               }}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={3000}
              onSlideChange={(swiper) =>
                setSelectedId(testimonials[swiper.realIndex].id)
              }
              watchSlidesProgress = {true}
              className="relative w-xs md:w-xl lg:max-w-2xl mx-auto mySwiper"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  {t.id === selectedId && (
                    <div className="lg:w-xl mx-auto">
                      <div className="flex flex-col justify-center items-center">
                        <p className="md:text-lg text-base text-center italic mb-6 ">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center mt-10">
                        <div className="flex justify-center items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-yellow-400 ${
                                i + 1 <= Math.floor(t.rating)
                                  ? "opacity-100"
                                  : "opacity-50"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm bg-white text-black px-2 py-1 rounded shadow">
                            {t.rating.toFixed(1)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">{t.name}</h3>
                        <p className="text-gray-400 text-sm">{t.designation}</p>
                        <img
                          className="mask mask-squircle lg:w-18 md:w-24 w-20 my-10"
                          src={t.avatar}
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full border-l border-gray-200 p-4">
            <div className="space-y-6 sm:space-y-8">
              {/* List */}
              <ul className="grid grid-cols-2 divide-y divide-y-2 divide-x divide-x-2 divide-gray-200 overflow-hidden">
                <li className="flex flex-col -m-0.5 p-4 sm:p-8">
                  <div className="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold  mb-2">
                    1.5k+
                  </div>
                  <p className="text-sm sm:text-base">
                    registered users who found or became roommates
                  </p>
                </li>

                <li className="flex flex-col -m-0.5 p-4 sm:p-8">
                  <div className="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold mb-2">
                    <svg
                      className="shrink-0 size-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 7-7 7 7" />
                      <path d="M12 19V5" />
                    </svg>
                    37%
                  </div>
                  <p className="text-sm sm:text-base ">
                    increase in roommate matches through our platform
                  </p>
                </li>

                <li className="flex flex-col -m-0.5 p-4 sm:p-8">
                  <div className="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold  mb-2">
                    <svg
                      className="shrink-0 size-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 7-7 7 7" />
                      <path d="M12 19V5" />
                    </svg>
                    100%
                  </div>
                  <p className="text-sm sm:text-base ">
                    Ensures a safer and more trustworthy roommate-finding experience.
                  </p>
                </li>

                <li className="flex flex-col -m-0.5 p-4 sm:p-8">
                  <div className="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold  mb-2">
                    7x
                  </div>
                  <p className="text-sm sm:text-base ">
                    Helps users boost their listings for faster visibility and better reach.
                  </p>
                </li>
              </ul>
              {/* End List */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
