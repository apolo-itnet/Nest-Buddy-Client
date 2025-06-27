import { FaSearch, FaUserFriends, FaComments } from 'react-icons/fa';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { FiUser } from "react-icons/fi";

const HowItWorks = () => {

  
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const steps = [

    {
      icon: <FiUser className="text-3xl text-blue-600 mb-4" />,
      title: "Sign Up or Log In",
      desc: "Create an account or log in to get started with Nest Buddy.",
    },

    {
      icon: <FaSearch className="text-4xl text-blue-600 mb-4" />,
      title: "Browse Rooms or Posts ",
      desc: "Easily search for available rooms or list your own roommate post.",
    },
    {
      icon: <FaUserFriends className="text-4xl text-green-600 mb-4" />,
      title: "View Profiles & Details",
      desc: "Check verified user profiles with all necessary details and preferences.",
    },
    {
      icon: <FaComments className="text-4xl text-purple-600 mb-4" />,
      title: "Contact & Connect",
      desc: "Connect securely and start chatting with your preferred roommate.",
    },
  ];

  return (
    <section className="w-full mx-auto py-20 rounded-lg">
      <div className="w-full mx-auto responsive-padding text-center font-league">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className=" mb-10">Find your perfect roommate in just a few steps</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos="fade-in"
              data-aos-delay={index * 100}
              className=" flex flex-col items-center rounded-2xl shadow-sm p-4 py-14 hover:shadow-md transition-all duration-300 border-base-200 border bg-stone-50 "
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-900">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
