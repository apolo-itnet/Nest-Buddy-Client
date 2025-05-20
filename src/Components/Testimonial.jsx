// Testimonial.jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    id: 1,
    company: "Pathao",
    quote: `From the moment we started using this platform,
it felt like a game-changer.
Our riders now complete tasks 20% faster,
and the real-time tracking has made our customers happier.
It saves time, reduces confusion,
and gives us total control over operations.`,
    rating: 4.8,
    name: "Shafin Ahmed",
    designation: "Operations Lead",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    id: 2,
    company: "bKash",
    quote: `We’ve tried several dashboards before,
but none felt as intuitive as this.
From user onboarding to transaction insights—
everything is super smooth.
Even our non-tech team loves using it.
It’s the future of mobile banking for us,
without any extra hassle or cost.`,
    rating: 4.9,
    name: "Rehnuma Sultana",
    designation: "Finance Director",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    company: "Grameenphone",
    quote: `Scalability and performance were always a concern.
But this system handles large volumes like magic.
Deployment was quick and effortless.
Our developers love the clean API design.
Customer queries have dropped significantly,
which shows how well this works.`,
    rating: 4.7,
    name: "Tariq Islam",
    designation: "Tech Lead",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 4,
    company: "Chaldal",
    quote: `Inventory management has never been this easy.
The system automatically updates in real-time.
We reduced waste by nearly 30%.
Deliveries are more accurate than ever before.
Plus, customer feedback has been overwhelmingly positive.
It’s a core part of our backend now.`,
    rating: 4.8,
    name: "Farzana Akter",
    designation: "Logistics Manager",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 5,
    company: "Daraz",
    quote: `We handle thousands of orders daily,
and this solution scaled with us perfectly.
Our product team gets better insights now.
The interface is modern and intuitive.
Even customer support is faster using it.
We’ve officially integrated it platform-wide.`,
    rating: 5.0,
    name: "Masud Rana",
    designation: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: 6,
    company: "Shajgoj",
    quote: `From makeup to delivery, this system supports all.
It helped organize our promotions better.
Managing user feedback became so easy.
Everyone on our team loves the dashboard.
It saves hours of work every week.
We’ve seen growth since switching to it.`,
    rating: 4.6,
    name: "Nusrat Jahan",
    designation: "Marketing Lead",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
  },
];

const Testimonial = () => {
  const [selectedId, setSelectedId] = useState(testimonials[0].id);

  return (
    <div className="bg-gray-900 text-white my-2 py-16 ">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={2000}
          className="relative"
          onSlideChange={(swiper) =>
            setSelectedId(testimonials[swiper.realIndex].id)
          }
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              {t.id === selectedId && (
                <div className="px-12 lg:px-0">
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="lg:text-6xl md:text-5xl text-4xl font-extrabold text-rose-500 mb-4">
                      {t.company}
                    </h1>
                    <p className="max-w-4xl md:text-lg text-base text-center italic mb-6 ">
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
    </div>
  );
};

export default Testimonial;
