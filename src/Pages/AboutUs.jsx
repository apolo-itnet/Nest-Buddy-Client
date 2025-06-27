import { motion } from "framer-motion";
import { Users, Home, HeartHandshake, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="w-full bg-p-color pt-color py-16 px-4 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-lime-500">About Nest Buddy</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Nest Buddy is your trusted platform for finding compatible roommates and shared living spaces with ease. Whether you're a student, a remote worker, or relocating, our platform ensures a stress-free journey to your ideal nest.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-lime-50 rounded-xl shadow p-6 text-center"
        >
          <Users size={36} className="mx-auto text-lime-500 mb-3" />
          <h3 className="text-xl font-semibold mb-1">Community Driven</h3>
          <p className="text-gray-600 text-sm">
            Our platform is powered by real users and real reviews to ensure trustworthy roommate connections.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-lime-100 rounded-xl shadow p-6 text-center"
        >
          <Home size={36} className="mx-auto text-lime-600 mb-3" />
          <h3 className="text-xl font-semibold mb-1">Safe Spaces</h3>
          <p className="text-gray-600 text-sm">
            Verified listings and user profiles keep your search secure and transparent.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-lime-200 rounded-xl shadow p-6 text-center"
        >
          <HeartHandshake size={36} className="mx-auto text-lime-700 mb-3" />
          <h3 className="text-xl font-semibold mb-1">Perfect Match</h3>
          <p className="text-gray-600 text-sm">
            Smart filtering helps you find roommates based on lifestyle, budget, and interests.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-lime-300 rounded-xl shadow p-6 text-center"
        >
          <Globe size={36} className="mx-auto text-lime-800 mb-3" />
          <h3 className="text-xl font-semibold mb-1">Expanding Network</h3>
          <p className="text-gray-600 text-sm">
            We’re continuously growing in cities across the country, making shared living accessible for all.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
