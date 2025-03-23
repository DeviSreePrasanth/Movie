import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SeatSelectionPopup = ({ onConfirm, movieTitle }) => {
  const today = new Date().toISOString().split("T")[0];
  const [numSeats, setNumSeats] = useState(2);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("8:40");
  const [backgroundUrl, setBackgroundUrl] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const posterUrl = location.state?.posterUrl;
    if (posterUrl) {
      console.log("Using poster URL from location state:", posterUrl);
      setBackgroundUrl(posterUrl);
    } else {
      console.warn("No poster URL found in location state, using fallback.");
      setBackgroundUrl("https://placehold.co/1920x1080?text=No+Image");
    }
  }, [location.state]);

  const getDynamicDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push({
        day: nextDate.getDate(),
        month: nextDate.toLocaleString("default", { month: "short" }),
        fullDate: nextDate.toISOString().split("T")[0],
      });
    }
    return dates;
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    onConfirm({ numSeats, date: selectedDate, time: selectedTime });
  };

  const displayTitle = movieTitle || "Unknown Movie";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundUrl || "https://placehold.co/1920x1080?text=Loading..."})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.5) blur(8px)", // Apply brightness and blur only to the image
          boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)", // Optional inner shadow for effect
        }}
      ></div>

      {/* Overlay for additional darkening */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative bg-gray-900/80 rounded-xl p-6 sm:p-8 w-11/12 max-w-lg sm:max-w-lg shadow-2xl border border-cyan-500/30 backdrop-blur-sm z-10 max-h-[90vh] sm:max-h-none overflow-y-auto sm:overflow-y-visible">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 sm:mb-6 text-center">
          Book Tickets for <span className="text-cyan-400">{displayTitle}</span>
        </h2>
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 sm:mb-4 text-center">
            How Many Seats?
          </h3>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 font-medium text-xs sm:text-sm transition-all ${
                  numSeats === num
                    ? "bg-cyan-500 text-white border-cyan-500 shadow-md"
                    : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-cyan-400"
                }`}
                onClick={() => setNumSeats(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 sm:mb-4 text-center">
            Select Date
          </h3>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {getDynamicDates().map((date) => (
              <button
                key={date.fullDate}
                className={`px-4 py-1 sm:px-5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all ${
                  selectedDate === date.fullDate
                    ? "bg-cyan-500 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedDate(date.fullDate)}
              >
                {date.day} {date.month}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 sm:mb-4 text-center">
            Select Time
          </h3>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {["8:40", "11:10", "14:00", "18:15", "20:30"].map((time) => (
              <button
                key={time}
                className={`px-4 py-1 sm:px-5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all ${
                  selectedTime === time
                    ? "bg-cyan-500 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs sm:text-sm text-gray-300">
            Recliners: ₹299 | Premium: ₹199 | Non-Premium: ₹149
          </p>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full py-2 sm:py-3 bg-cyan-500 text-gray-100 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:-translate-y-1 hover:bg-cyan-600 transition-all shadow-md"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPopup;