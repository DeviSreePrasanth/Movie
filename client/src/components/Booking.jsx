import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Payment from "./Payment";
import SeatSelectionPopup from "./SeatSelectionPopup";

const Booking = () => {
  const { movieTitle } = useParams();
  const decodedMovieTitle = movieTitle ? decodeURIComponent(movieTitle) : "Unknown Movie";
  console.log("Raw movieTitle from URL:", movieTitle);
  console.log("Decoded movieTitle:", decodedMovieTitle);
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
        const response = await axios.get(`http://localhost:4000/api/getBookedSeats`, {
          params: {
            movieName: decodedMovieTitle,
            date: selectedDate,
            time: selectedTime,
          },
        });

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
  }, [decodedMovieTitle, selectedDate, selectedTime]);

  const handleSeatSelection = (row, seat, price) => {
    if (bookedSeats.some((booked) => booked.row === row && booked.seat === seat)) return;

    const selectedSeatSet = new Set(selectedSeats.map((s) => `${s.row}-${s.seat}`));

    if (selectedSeatSet.has(`${row}-${seat}`)) {
      setSelectedSeats(
        selectedSeats.filter((selected) => `${selected.row}-${selected.seat}` !== `${row}-${seat}`)
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

  const calculateTotalPrice = () => selectedSeats.reduce((total, seat) => total + seat.price, 0);

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
        movieName: decodedMovieTitle,
        seats: selectedSeats,
        date: selectedDate,
        time: selectedTime,
      });

      const response = await axios.get(`http://localhost:4000/api/getBookedSeats`, {
        params: {
          movieName: decodedMovieTitle,
          date: selectedDate,
          time: selectedTime,
        },
      });

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
    return <SeatSelectionPopup onConfirm={handlePopupConfirm} movieTitle={decodedMovieTitle} />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200 font-poppins flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar: Selected Seats */}
      <div className="w-full md:w-80 relative">
        <div className="absolute inset-0 bg-black/75 p-6 flex flex-col items-center justify-start backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-cyan-400">
            {decodedMovieTitle}
          </h2>
          <div className="w-3/4 h-1 bg-cyan-500 my-3 rounded-full"></div>
          <p className="text-sm mb-3 text-gray-300">
            Date: {selectedDate ? new Date(selectedDate).toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "N/A"} | Time: {selectedTime || "N/A"}
          </p>
          <h3 className="text-lg font-semibold mb-6 text-cyan-400">
            Selected Seats ({selectedSeats.length}/{numSeats})
          </h3>
          <div className="w-full mb-6">
            {selectedSeats.length === 0 ? (
              <p className="opacity-70 text-center text-gray-400">No seats selected yet.</p>
            ) : (
              selectedSeats.map((seat, index) => (
                <div
                  key={`${seat.row}-${seat.seat}`}
                  className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg my-2 transition-transform hover:translate-x-2 border border-cyan-500/30"
                >
                  <span className="text-sm text-gray-200">{`Row ${seat.row} - Seat ${seat.seat} (₹${seat.price})`}</span>
                  <button
                    onClick={() => handleRemoveSeat(index)}
                    className="bg-transparent border-none text-cyan-400 text-sm font-semibold cursor-pointer hover:text-cyan-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <button
            onClick={handlePurchase}
            className="w-4/5 py-3 bg-cyan-700 text-gray-100 rounded-lg text-base font-semibold cursor-pointer shadow-md hover:bg-cyan-600 hover:-translate-y-1 hover:brightness-125 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:brightness-100"
          >
            Purchase (₹{calculateTotalPrice()})
          </button>
          {error && <p className="text-cyan-300 font-medium mt-3 text-sm">{error}</p>}
        </div>
      </div>

      {/* Theater Seating Layout */}
      <div className="flex-1 p-6 md:p-10 text-center bg-gray-900/20 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800">
  <div className="flex justify-center">
    <div className="flex-1">
      {/* Recliners Section (Rows D-F) */}
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-cyan-400">Recliners (₹299)</h4>
      <div className="flex flex-col items-center mb-8">
        {Array.from({ length: 3 }).map((_, rowIndex) => {
          const rowLabel = String.fromCharCode(68 + rowIndex); // D to F
          const seatsPerRow = rowLabel === "D" ? 26 : 24;
          const leftSeats = Math.floor(seatsPerRow / 2);
          const rightSeats = seatsPerRow - leftSeats;

          return (
            <div key={rowLabel} className="flex items-center mb-4 w-full max-w-4xl justify-center">
              <span className="w-8 text-gray-200 font-semibold mr-2 flex items-center justify-center">
                {rowLabel}
              </span>
              <div className="flex gap-2">
                {Array.from({ length: leftSeats }).map((_, seatIndex) => {
                  const seatNumber = seatIndex + 1; // Left half: 1 to leftSeats
                  const isBooked = bookedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );
                  const isSelected = selectedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );

                  return (
                    <div
                      key={seatNumber}
                      className={`w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border border-gray-600 rounded-lg text-sm transition-all ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-cyan-500 border-cyan-500"
                          : "bg-transparent cursor-pointer hover:bg-cyan-400 hover:border-cyan-400 hover:text-black"
                      }`}
                      onClick={() => !isBooked && handleSeatSelection(rowLabel, seatNumber, 299)}
                    >
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
              <div className="w-20 md:w-24"></div> {/* Increased gap between left and right halves */}
              <div className="flex gap-2">
                {Array.from({ length: rightSeats }).map((_, seatIndex) => {
                  const seatNumber = leftSeats + seatIndex + 1; // Right half: leftSeats+1 to seatsPerRow
                  const isBooked = bookedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );
                  const isSelected = selectedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );

                  return (
                    <div
                      key={seatNumber}
                      className={`w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border border-gray-600 rounded-lg text-sm transition-all ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-cyan-500 border-cyan-500"
                          : "bg-transparent cursor-pointer hover:bg-cyan-400 hover:border-cyan-400 hover:text-black"
                      }`}
                      onClick={() => !isBooked && handleSeatSelection(rowLabel, seatNumber, 299)}
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

      {/* Premium Section (Rows G-M) */}
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-cyan-400">Premium (₹199)</h4>
      <div className="flex flex-col items-center mb-8">
        {Array.from({ length: 7 }).map((_, rowIndex) => {
          const rowLabel = String.fromCharCode(71 + rowIndex); // G to M
          const seatsPerRow = 24;
          const leftSeats = Math.floor(seatsPerRow / 2);
          const rightSeats = seatsPerRow - leftSeats;

          return (
            <div key={rowLabel} className="flex items-center mb-4 w-full max-w-4xl justify-center">
              <span className="w-8 text-gray-200 font-semibold mr-2 flex items-center justify-center">
                {rowLabel}
              </span>
              <div className="flex gap-2">
                {Array.from({ length: leftSeats }).map((_, seatIndex) => {
                  const seatNumber = seatIndex + 1; // Left half: 1 to leftSeats
                  const isBooked = bookedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );
                  const isSelected = selectedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );

                  return (
                    <div
                      key={seatNumber}
                      className={`w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border border-gray-600 rounded-lg text-sm transition-all ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-cyan-500 border-cyan-500"
                          : "bg-transparent cursor-pointer hover:bg-cyan-400 hover:border-cyan-400 hover:text-black"
                      }`}
                      onClick={() => !isBooked && handleSeatSelection(rowLabel, seatNumber, 199)}
                    >
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
              <div className="w-20 md:w-24"></div> {/* Increased gap between left and right halves */}
              <div className="flex gap-2">
                {Array.from({ length: rightSeats }).map((_, seatIndex) => {
                  const seatNumber = leftSeats + seatIndex + 1; // Right half: leftSeats+1 to seatsPerRow
                  const isBooked = bookedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );
                  const isSelected = selectedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );

                  return (
                    <div
                      key={seatNumber}
                      className={`w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border border-gray-600 rounded-lg text-sm transition-all ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-cyan-500 border-cyan-500"
                          : "bg-transparent cursor-pointer hover:bg-cyan-400 hover:border-cyan-400 hover:text-black"
                      }`}
                      onClick={() => !isBooked && handleSeatSelection(rowLabel, seatNumber, 199)}
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

      {/* Non-Premium Section (Rows N-P) */}
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-cyan-400">Non-Premium (₹149)</h4>
      <div className="flex flex-col items-center mb-8">
        {Array.from({ length: 3 }).map((_, rowIndex) => {
          const rowLabel = String.fromCharCode(78 + rowIndex); // N to P
          const seatsPerRow = 22;
          const leftSeats = Math.floor(seatsPerRow / 2);
          const rightSeats = seatsPerRow - leftSeats;

          return (
            <div key={rowLabel} className="flex items-center mb-4 w-full max-w-4xl justify-center">
              <span className="w-8 text-gray-200 font-semibold mr-2 flex items-center justify-center">
                {rowLabel}
              </span>
              <div className="flex gap-2">
                {Array.from({ length: leftSeats }).map((_, seatIndex) => {
                  const seatNumber = seatIndex + 1; // Left half: 1 to leftSeats
                  const isBooked = bookedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );
                  const isSelected = selectedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );

                  return (
                    <div
                      key={seatNumber}
                      className={`w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border border-gray-600 rounded-lg text-sm transition-all ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-cyan-500 border-cyan-500"
                          : "bg-transparent cursor-pointer hover:bg-cyan-400 hover:border-cyan-400 hover:text-black"
                      }`}
                      onClick={() => !isBooked && handleSeatSelection(rowLabel, seatNumber, 149)}
                    >
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
              <div className="w-20 md:w-24"></div> {/* Increased gap between left and right halves */}
              <div className="flex gap-2">
                {Array.from({ length: rightSeats }).map((_, seatIndex) => {
                  const seatNumber = leftSeats + seatIndex + 1; // Right half: leftSeats+1 to seatsPerRow
                  const isBooked = bookedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );
                  const isSelected = selectedSeats.some(
                    (seat) => seat.row === rowLabel && seat.seat === seatNumber
                  );

                  return (
                    <div
                      key={seatNumber}
                      className={`w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border border-gray-600 rounded-lg text-sm transition-all ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-cyan-500 border-cyan-500"
                          : "bg-transparent cursor-pointer hover:bg-cyan-400 hover:border-cyan-400 hover:text-black"
                      }`}
                      onClick={() => !isBooked && handleSeatSelection(rowLabel, seatNumber, 149)}
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

      {/* Enhanced Screen */}
      <div className="relative w-3/4 h-16 bg-gradient-to-b from-gray-800 to-gray-900 mx-auto rounded-b-[80px] shadow-2xl overflow-hidden">
        <div className="absolute inset-0 shadow-[0_0_30px_10px_rgba(34,211,238,0.7)] rounded-b-[80px]"></div>
        <div className="absolute inset-0 shadow-[0_0_50px_20px_rgba(34,211,238,0.4)] rounded-b-[80px]"></div>
        <div className="absolute inset-0 shadow-inner rounded-b-[80px]"></div>
        <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-500"></div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-cyan-500"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm md:text-base font-semibold opacity-70">
          SCREEN
        </div>
      </div>

      {/* Seat Legend */}
      <div className="mt-10 flex justify-center gap-6 text-sm md:text-base flex-wrap">
        <div className="flex items-center">
          <div className="w-6 h-6 border border-gray-600 rounded"></div>
          <span className="ml-2 text-gray-300">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-cyan-500 rounded"></div>
          <span className="ml-2 text-gray-300">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="ml-2 text-gray-300">Sold</span>
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