import React, { useState, useEffect } from "react";

const SeatSelectionPopup = ({ onConfirm, movieTitle }) => {
  // Dynamically set today's date
  const today = new Date().toISOString().split("T")[0]; // Gets current date (e.g., "2025-03-22")

  const [numSeats, setNumSeats] = useState(2);
  const [selectedDate, setSelectedDate] = useState(today); // Default to today
  const [selectedTime, setSelectedTime] = useState("8:40"); // Default to first show

  // Generate real-time dates starting from today
  const getDynamicDates = () => {
    const today = new Date(); // Use current date
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-8 w-11/12 max-w-lg shadow-2xl border border-gray-700">
        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Book Tickets for <span className="text-red-500">{movieTitle}</span>
        </h2>

        {/* Number of Seats Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">How Many Seats?</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-12 h-12 rounded-full border-2 font-medium text-sm transition-all ${
                  numSeats === num
                    ? "bg-red-600 text-white border-red-600 shadow-md"
                    : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-gray-500"
                }`}
                onClick={() => setNumSeats(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">Select Date</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {getDynamicDates().map((date) => (
              <button
                key={date.fullDate}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedDate === date.fullDate
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedDate(date.fullDate)}
              >
                {date.day} {date.month}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">Select Time</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {["8:40", "11:10", "14:00", "18:15", "20:30"].map((time) => (
              <button
                key={time}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedTime === time
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Information */}
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-400">
            Recliner: ₹249 | Sofa: ₹199 | Premium Plus: ₹149 | Premium: ₹149 | Lounger: ₹149
          </p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-base hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPopup;