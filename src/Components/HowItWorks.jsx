import { FaSearch, FaUserFriends, FaComments } from 'react-icons/fa';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

const HowItWorks = () => {

  
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const steps = [
    {
      icon: <FaSearch className="text-4xl text-blue-600 mb-4" />,
      title: "Browse Rooms or Post Roommate",
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
    <section className="py-20 dark:bg-base-100 text-base-content">
      <div className="w-full mx-auto responsive-padding text-center font-league">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className=" mb-10">Find your perfect roommate in just a few steps</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className=" rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border-base-200 border"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
