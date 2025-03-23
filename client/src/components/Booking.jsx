import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Payment from "./Payment";
import SeatSelectionPopup from "./SeatSelectionPopup";

const Booking = () => {
  const { movieName } = useParams();
  const movieTitle = decodeURIComponent(movieName); // Simplified: decodeURIComponent already handles %20

  const [showPopup, setShowPopup] = useState(true);
  const [numSeats, setNumSeats] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!selectedDate || !selectedTime) return;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getBookedSeats`,
          {
            params: {
              movieName: movieTitle,
              date: selectedDate,
              time: selectedTime,
            },
          }
        );

        const combinedBookedSeats = response.data.flatMap((booking) =>
          booking.seats.map((seat) => ({
            row: seat.row,
            seat: seat.seat,
          }))
        );

        setBookedSeats(combinedBookedSeats);
      } catch (err) {
        console.error("Error fetching booked seats:", err);
        setError("Failed to load booked seats.");
      }
    };

    fetchBookedSeats();
  }, [movieTitle, selectedDate, selectedTime]);

  const handleSeatSelection = (row, seat, price) => {
    if (bookedSeats.some((booked) => booked.row === row && booked.seat === seat))
      return;

    const selectedSeatSet = new Set(
      selectedSeats.map((s) => `${s.row}-${s.seat}`)
    );

    if (selectedSeatSet.has(`${row}-${seat}`)) {
      setSelectedSeats(
        selectedSeats.filter(
          (selected) => `${selected.row}-${selected.seat}` !== `${row}-${seat}`
        )
      );
    } else {
      if (selectedSeats.length >= numSeats) {
        setError(`You can only select ${numSeats} seats.`);
        return;
      }
      setSelectedSeats([...selectedSeats, { row, seat, price }]);
      setError("");
    }
  };

  const handleRemoveSeat = (index) => {
    const newSeats = [...selectedSeats];
    newSeats.splice(index, 1);
    setSelectedSeats(newSeats);
  };

  const calculateTotalPrice = () =>
    selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const handlePurchase = () => {
    if (selectedSeats.length === 0) {
      setError("Please select at least one seat to proceed.");
      return;
    }
    if (selectedSeats.length < numSeats) {
      setError(`Please select ${numSeats} seats to proceed.`);
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await axios.post("http://localhost:4000/api/bookSeats", {
        movieName: movieTitle,
        seats: selectedSeats,
        date: selectedDate,
        time: selectedTime,
      });

      const response = await axios.get(
        `http://localhost:4000/api/getBookedSeats`,
        {
          params: {
            movieName: movieTitle,
            date: selectedDate,
            time: selectedTime,
          },
        }
      );

      const combinedBookedSeats = response.data.flatMap((booking) =>
        booking.seats.map((seat) => ({ row: seat.row, seat: seat.seat }))
      );

      setBookedSeats(combinedBookedSeats);
      setSelectedSeats([]);
      setError("");
    } catch (err) {
      console.error("Error during purchase:", err);
      setError("Failed to complete purchase.");
    } finally {
      setShowPayment(false);
    }
  };

  const handlePopupConfirm = ({ numSeats, date, time }) => {
    setNumSeats(numSeats);
    setSelectedDate(date);
    setSelectedTime(time);
    setShowPopup(false);
  };

  if (showPopup) {
    return <SeatSelectionPopup onConfirm={handlePopupConfirm} movieTitle={movieTitle} />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-poppins flex flex-row overflow-x-hidden">
      {/* Sidebar: Selected Seats */}
      <div className="w-80 relative">
        <div className="absolute inset-0 bg-black/75 p-6 flex flex-col items-center justify-start backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-3">{movieTitle}</h2>
          <div className="w-70 h-1 bg-gradient-to-r from-red-500 to-red-300 my-3"></div>
          <p className="text-sm mb-3">
            Date: {new Date(selectedDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}{" "}
            | Time: {selectedTime}
          </p>
          <h3 className="text-lg font-semibold mb-6">
            Selected Seats ({selectedSeats.length}/{numSeats})
          </h3>
          <div className="w-full mb-6">
            {selectedSeats.length === 0 ? (
              <p className="opacity-70 text-center">No seats selected yet.</p>
            ) : (
              selectedSeats.map((seat, index) => (
                <div
                  key={`${seat.row}-${seat.seat}`}
                  className="flex justify-between items-center p-3 bg-white/10 rounded-lg my-2 transition-transform hover:translate-x-2"
                >
                  <span className="text-sm">{`Row ${seat.row} - Seat ${seat.seat} (₹${seat.price})`}</span>
                  <button
                    onClick={() => handleRemoveSeat(index)}
                    className="bg-transparent border-none text-red-500 text-sm font-semibold cursor-pointer hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <button
            onClick={handlePurchase}
            className="w-4/5 py-3 bg-gradient-to-r from-red-500 to-red-300 border-none rounded-lg text-white text-base font-semibold cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Purchase (₹{calculateTotalPrice()})
          </button>
          {error && <p className="text-red-500 font-medium mt-3 text-sm">{error}</p>}
        </div>
      </div>

      {/* Theater Seating Layout */}
      <div className="flex-1 p-10 text-center bg-white/5 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-700">
        <div className="flex justify-center">
          {/* Seating Sections */}
          <div className="flex-1">
            {/* Recliners Section (Rows D-F, Farthest from Screen) */}
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Recliners (₹299)</h4>
            <div className="flex flex-col items-center mb-8">
              {Array.from({ length: 3 }).map((_, rowIndex) => {
                const rowLabel = String.fromCharCode(68 + rowIndex); // D to F
                const seatsPerRow = rowLabel === "D" ? 26 : 24;
                const leftSeats = Math.floor(seatsPerRow / 2);
                const rightSeats = seatsPerRow - leftSeats;

                return (
                  <div key={rowLabel} className="flex items-center mb-4">
                    {/* Row Label */}
                    <span className="w-8 text-white font-semibold mr-2 flex items-center justify-center">
                      {rowLabel}
                    </span>
                    {/* Left Section */}
                    <div className="flex gap-2">
                      {Array.from({ length: leftSeats }).map((_, seatIndex) => {
                        const seatNumber = leftSeats - seatIndex;
                        const isBooked = bookedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );
                        const isSelected = selectedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );

                        return (
                          <div
                            key={seatNumber}
                            className={`w-8 h-8 flex justify-center items-center border border-gray-500 rounded-lg text-sm transition-all ${
                              isBooked
                                ? "bg-gray-300 cursor-not-allowed opacity-70"
                                : isSelected
                                ? "bg-green-500 border-green-500"
                                : "bg-transparent cursor-pointer hover:bg-yellow-300 hover:border-yellow-300"
                            }`}
                            onClick={() =>
                              !isBooked && handleSeatSelection(rowLabel, seatNumber, 299)
                            }
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                    {/* Aisle (gap) */}
                    <div className="w-6"></div>
                    {/* Right Section */}
                    <div className="flex gap-2">
                      {Array.from({ length: rightSeats }).map((_, seatIndex) => {
                        const seatNumber = seatsPerRow - seatIndex;
                        const isBooked = bookedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );
                        const isSelected = selectedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );

                        return (
                          <div
                            key={seatNumber}
                            className={`w-8 h-8 flex justify-center items-center border border-gray-500 rounded-lg text-sm transition-all ${
                              isBooked
                                ? "bg-gray-300 cursor-not-allowed opacity-70"
                                : isSelected
                                ? "bg-green-500 border-green-500"
                                : "bg-transparent cursor-pointer hover:bg-yellow-300 hover:border-yellow-300"
                            }`}
                            onClick={() =>
                              !isBooked && handleSeatSelection(rowLabel, seatNumber, 299)
                            }
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Premium Section (Rows G-M, Middle Section) */}
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Premium (₹199)</h4>
            <div className="flex flex-col items-center mb-8">
              {Array.from({ length: 7 }).map((_, rowIndex) => {
                const rowLabel = String.fromCharCode(71 + rowIndex); // G to M
                const seatsPerRow = 24;
                const leftSeats = Math.floor(seatsPerRow / 2);
                const rightSeats = seatsPerRow - leftSeats;

                return (
                  <div key={rowLabel} className="flex items-center mb-4">
                    {/* Row Label */}
                    <span className="w-8 text-white font-semibold mr-2 flex items-center justify-center">
                      {rowLabel}
                    </span>
                    {/* Left Section */}
                    <div className="flex gap-2">
                      {Array.from({ length: leftSeats }).map((_, seatIndex) => {
                        const seatNumber = leftSeats - seatIndex;
                        const isBooked = bookedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );
                        const isSelected = selectedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );

                        return (
                          <div
                            key={seatNumber}
                            className={`w-8 h-8 flex justify-center items-center border border-gray-500 rounded-lg text-sm transition-all ${
                              isBooked
                                ? "bg-gray-300 cursor-not-allowed opacity-70"
                                : isSelected
                                ? "bg-green-500 border-green-500"
                                : "bg-transparent cursor-pointer hover:bg-blue-300 hover:border-blue-300"
                            }`}
                            onClick={() =>
                              !isBooked && handleSeatSelection(rowLabel, seatNumber, 199)
                            }
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                    {/* Aisle (gap) */}
                    <div className="w-6"></div>
                    {/* Right Section */}
                    <div className="flex gap-2">
                      {Array.from({ length: rightSeats }).map((_, seatIndex) => {
                        const seatNumber = seatsPerRow - seatIndex;
                        const isBooked = bookedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );
                        const isSelected = selectedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );

                        return (
                          <div
                            key={seatNumber}
                            className={`w-8 h-8 flex justify-center items-center border border-gray-500 rounded-lg text-sm transition-all ${
                              isBooked
                                ? "bg-gray-300 cursor-not-allowed opacity-70"
                                : isSelected
                                ? "bg-green-500 border-green-500"
                                : "bg-transparent cursor-pointer hover:bg-blue-300 hover:border-blue-300"
                            }`}
                            onClick={() =>
                              !isBooked && handleSeatSelection(rowLabel, seatNumber, 199)
                            }
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Non-Premium Section (Rows N-P, Closest to Screen) */}
            <h4 className="text-lg font-semibold mb-4 text-gray-300">Non-Premium (₹149)</h4>
            <div className="flex flex-col items-center mb-8">
              {Array.from({ length: 3 }).map((_, rowIndex) => {
                const rowLabel = String.fromCharCode(78 + rowIndex); // N to P
                const seatsPerRow = 22;
                const leftSeats = Math.floor(seatsPerRow / 2);
                const rightSeats = seatsPerRow - leftSeats;

                return (
                  <div key={rowLabel} className="flex items-center mb-4">
                    {/* Row Label */}
                    <span className="w-8 text-white font-semibold mr-2 flex items-center justify-center">
                      {rowLabel}
                    </span>
                    {/* Left Section */}
                    <div className="flex gap-2">
                      {Array.from({ length: leftSeats }).map((_, seatIndex) => {
                        const seatNumber = leftSeats - seatIndex;
                        const isBooked = bookedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );
                        const isSelected = selectedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );

                        return (
                          <div
                            key={seatNumber}
                            className={`w-8 h-8 flex justify-center items-center border border-gray-500 rounded-lg text-sm transition-all ${
                              isBooked
                                ? "bg-gray-300 cursor-not-allowed opacity-70"
                                : isSelected
                                ? "bg-green-500 border-green-500"
                                : "bg-transparent cursor-pointer hover:bg-gray-400 hover:border-gray-400"
                            }`}
                            onClick={() =>
                              !isBooked && handleSeatSelection(rowLabel, seatNumber, 149)
                            }
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                    {/* Aisle (gap) */}
                    <div className="w-6"></div>
                    {/* Right Section */}
                    <div className="flex gap-2">
                      {Array.from({ length: rightSeats }).map((_, seatIndex) => {
                        const seatNumber = seatsPerRow - seatIndex;
                        const isBooked = bookedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );
                        const isSelected = selectedSeats.some(
                          (seat) => seat.row === rowLabel && seat.seat === seatNumber
                        );

                        return (
                          <div
                            key={seatNumber}
                            className={`w-8 h-8 flex justify-center items-center border border-gray-500 rounded-lg text-sm transition-all ${
                              isBooked
                                ? "bg-gray-300 cursor-not-allowed opacity-70"
                                : isSelected
                                ? "bg-green-500 border-green-500"
                                : "bg-transparent cursor-pointer hover:bg-gray-400 hover:border-gray-400"
                            }`}
                            onClick={() =>
                              !isBooked && handleSeatSelection(rowLabel, seatNumber, 149)
                            }
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Screen with Red Glow Lights */}
            <div className="relative w-3/4 h-16 bg-gradient-to-b from-gray-800 to-gray-900 mx-auto rounded-b-[80px] shadow-2xl overflow-hidden">
              {/* Red Glow Effect */}
              <div className="absolute inset-0 shadow-[0_0_30px_10px_rgba(239,68,68,0.7)] rounded-b-[80px]"></div>
              {/* Outer Red Glow */}
              <div className="absolute inset-0 shadow-[0_0_50px_20px_rgba(239,68,68,0.4)] rounded-b-[80px]"></div>
              {/* Inner Shadow for Depth */}
              <div className="absolute inset-0 shadow-inner rounded-b-[80px]"></div>
              {/* Red Accent Lights */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-red-400"></div>
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-red-600 to-red-400"></div>
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
              {/* Screen Label */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm font-semibold opacity-70">
                SCREEN
              </div>
            </div>

            {/* Seat Legend */}
            <div className="mt-10 flex justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center">
                <div className="w-6 h-6 border border-gray-500 rounded"></div>
                <span className="ml-2">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span className="ml-2">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <span className="ml-2">Sold</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <Payment
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Booking;