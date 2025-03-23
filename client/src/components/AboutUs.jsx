import React from 'react';
import { FaUsers, FaGlobe, FaLandmark, FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-cyan-500 bg-clip-text text-transparent drop-shadow-md">
          About Us
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          25 years ago, in a little town, we had an idea: make watching movies easy and fun for everyone. That small thought turned into something big—a place where millions of people enjoy movies every day. We’ve come a long way, and we’re excited to keep going with you!
        </p>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-200 drop-shadow-sm">How We Started</h3>
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          It all began with a simple goal: make booking movie tickets super easy. Now, we’re happy to help tons of movie fans every day. From a tiny start, we’ve grown into a name people trust for their movie fun.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">50 Million+</h3>
            <p className="text-gray-400">App Users</p>
          </motion.div>
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">15 Million+</h3>
            <p className="text-gray-400">Tickets Sold Monthly</p>
          </motion.div>
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">2 Billion+</h3>
            <p className="text-gray-400">Page Visits Monthly</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Facts Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-200 drop-shadow-sm">Fun Facts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <FaUsers size={60} className="text-cyan-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">30 Million+</h3>
            <p className="text-gray-400">Happy Users</p>
          </motion.div>
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <FaGlobe size={60} className="text-cyan-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">5</h3>
            <p className="text-gray-400">Countries</p>
          </motion.div>
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <FaLandmark size={60} className="text-cyan-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">650+</h3>
            <p className="text-gray-400">Towns and Cities</p>
          </motion.div>
          <motion.div className="text-center p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all" whileHover={{ scale: 1.05 }}>
            <FaFilm size={60} className="text-cyan-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">5000+</h3>
            <p className="text-gray-400">Screens</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-200 drop-shadow-sm">What We’re About</h3>
        <p className="text-lg md:text-xl leading-relaxed bg-gray-900/30 p-6 rounded-lg text-gray-300">
          At Movie Hub, we want to make movies fun and easy for everyone, everywhere. We think movies are more than just something to watch—they’re a way to feel happy, explore new places, and share stories. We’re here to make your movie time awesome!
        </p>
      </motion.section>

      {/* Join Us Section */}
      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-200 drop-shadow-sm">Come Along!</h3>
        <p className="text-lg md:text-xl leading-relaxed bg-gray-900/30 p-6 rounded-lg mb-6 text-gray-300">
          Love movies a lot? Or just like watching one sometimes? Either way, we’d love for you to be part of our movie adventure. Let’s make some great movie moments together!
        </p>
        <button className="px-8 py-3 text-lg font-medium bg-cyan-500 text-gray-100 rounded-full hover:brightness-125 hover:scale-110 transition-all duration-300">
          Book Tickets
        </button>
      </motion.section>
    </div>
  );
};

export default AboutUs;