import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-200 py-6 px-4 sm:px-6 md:px-8 lg:px-8 overflow-hidden font-poppins">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 to-black/80 z-0"></div>
      <div className="absolute inset-0 z-0"></div>

      {/* Footer content */}
      <div className="relative max-w-7xl mx-auto flex flex-wrap justify-between gap-6 sm:gap-8 z-10">
        {/* Profile Section */}
        <motion.div
          className="flex-1 min-w-[160px] sm:min-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4 drop-shadow-md">PROFILE</h4>
          <ul className="list-none p-0">
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">FAQ's</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Pricing Plans</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Order Tracking</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Returns</li>
          </ul>
        </motion.div>

        {/* Recent Posts Section */}
        <motion.div
          className="flex-1 min-w-[160px] sm:min-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4 drop-shadow-md">RECENT POSTS</h4>
          <ul className="list-none p-0">
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Touch of Uniqueness</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Offices You Won’t Forget</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Cicilan</li>
          </ul>
        </motion.div>

        {/* Customer Section */}
        <motion.div
          className="flex-1 min-w-[160px] sm:min-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4 drop-shadow-md">CUSTOMER</h4>
          <ul className="list-none p-0">
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Help & Contact Us</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Return</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Online Stores</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">Terms & Conditions</li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="flex-1 min-w-[160px] sm:min-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4 drop-shadow-md">CONTACT</h4>
          <ul className="list-none p-0">
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">951596422</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">moviehub@gmail.com</li>
            <li className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-300 hover:text-lime-400 transition-colors duration-300">movieshub</li>
          </ul>
          <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
            <FaInstagram className="text-cyan-400 text-xl sm:text-2xl hover:text-lime-400 hover:scale-125 transition-all duration-300" />
            <FaTwitter className="text-cyan-400 text-xl sm:text-2xl hover:text-lime-400 hover:scale-125 transition-all duration-300" />
            <FaFacebook className="text-cyan-400 text-xl sm:text-2xl hover:text-lime-400 hover:scale-125 transition-all duration-300" />
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="relative text-center mt-6 sm:mt-8 z-10">
        <hr className="border-gray-700 mb-3 sm:mb-4" />
        <p className="text-xs sm:text-sm text-gray-300">© VIBA. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;