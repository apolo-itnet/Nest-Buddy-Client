import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { slideUp } from "../../Utility/Animation";

const StatContent = () => {
  const [stats, setStats] = useState({});
  const { user } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {

    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/email/${user.email.toLowerCase()}`)
        .then((res) => setMongoUser(res.data))
        .catch((err) => console.error("User fetch error:", err));
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/stats/dashboard?email=${user.email}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!mongoUser) return <p>Loading user info...</p>;

  return (
    <div>
      <div>
        <div className="bg-white shadow rounded-xl p-6 text-center w-full max-w-xs mx-auto my-10">
          <img
            src={mongoUser.photo}
            alt={mongoUser.firstName}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">
            {mongoUser.firstName} {mongoUser.lastName}
          </h2>
          <p className="text-gray-500">{mongoUser.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-league">
        <motion.div
          variants={slideUp(0.5)}
          initial="initial"
          animate="animate"
          exit={"exit"}
          className="bg-gradient-to-r from-slate-900 to-slate-700 p-6 py-10 rounded-xl shadow text-center text-white"
        >
          <h3 className="text-3xl font-semibold ">Total Posts</h3>
          <p className="text-5xl font-bold mt-2">
            {" "}
            <CountUp end={stats.totalPosts || 0} duration={5} />
          </p>
        </motion.div>

        <motion.div
          variants={slideUp(0.7)}
          initial="initial"
          animate="animate"
          exit={"exit"}
          className="bg-gradient-to-bl from-[#84cc16] via-[#16a34a] to-[#0f766e] p-6 py-10 rounded-xl shadow text-center text-white"
        >
          <h3 className="text-3xl font-semibold">My Posts</h3>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={stats.myPosts || 0} duration={10} />
          </p>
        </motion.div>

        <motion.div
          variants={slideUp(0.9)}
          initial="initial"
          animate="animate"
          exit={"exit"}
          className="bg-gradient-to-r from-emerald-500 to-emerald-900 p-6 py-10 rounded-xl shadow text-center text-white"
        >
          <h3 className="text-3xl font-semibold ">
            Available Rooms
          </h3>
          <p className="text-4xl  font-bold mt-2">
            <CountUp end={stats.availableRooms || 0} duration={8} />
          </p>
        </motion.div>

        <motion.div
          variants={slideUp(1)}
          initial="initial"
          animate="animate"
          exit={"exit"}
          className="bg-gradient-to-r from-emerald-500 to-emerald-900 p-6 py-10 rounded-xl shadow text-center text-white"
        >
          <h3 className="text-3xl font-semibold">
            Immediate Rooms
          </h3>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={stats.immediateRooms || 0} duration={8} />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StatContent;
