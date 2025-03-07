import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Payment from "./Payment";

// Custom CSS for gradients, scrollbar, and screen arc
const GlobalStyle = () => (
  <style>
    {`
      .scrollable-booking::-webkit-scrollbar {
        width: 8px;
      }
      .scrollable-booking::-webkit-scrollbar-track {
        background: #2c2c2c;
      }
      .scrollable-booking::-webkit-scrollbar-thumb {
        background: #ff4d4d;
        border-radius: 4px;
      }
      .scrollable-booking::-webkit-scrollbar-thumb:hover {
        background: #ff7878;
      }
      .booking-gradient {
        background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
      }
      .button-gradient {
        background: linear-gradient(90deg, #ff4d4d, #ff7878);
      }
      .screen-gradient {
        background: linear-gradient(180deg, #ff4d4d, #d32f2f);
      }
      .underline-gradient {
        background: linear-gradient(90deg, #ff4d4d, #ff7878);
      }
      .screen-arc {
        border-radius: 0 0 150px 150px;
        clip-path: ellipse(50% 100% at 50% 100%);
      }
    `}
  </style>
);

const Booking = () => {
  const { movieName } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(21);
  const [selectedTime, setSelectedTime] = useState("18:15");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const movieTitle = decodeURIComponent(movieName).replace(/%20/g, " ");

  useEffect(() => {
    const fetchBookedSeats = async () => {
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

        console.log("Fetched Booked Seats:", response.data);

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

  const handleSeatSelection = (row, seat) => {
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
      setSelectedSeats([...selectedSeats, { row, seat, price: 240 }]);
    }
  };

  const handleRemoveSeat = (index) => {
    const newSeats = [...selectedSeats];
    newSeats.splice(index, 1);
    setSelectedSeats(newSeats);
  };

  const handleDateSelection = (date) => setSelectedDate(date);
  const handleTimeSelection = (time) => setSelectedTime(time);
  const calculateTotalPrice = () =>
    selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const handlePurchase = () => {
    if (selectedSeats.length === 0) {
      setError("Please select at least one seat to proceed.");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const postResponse = await axios.post(
        "http://localhost:4000/api/bookSeats",
        {
          movieName: movieTitle,
          seats: selectedSeats,
          date: selectedDate,
          time: selectedTime,
        }
      );

      console.log("Booking Response:", postResponse.data);

      const getResponse = await axios.get(
        `http://localhost:4000/api/getBookedSeats`,
        {
          params: {
            movieName: movieTitle,
            date: selectedDate,
            time: selectedTime,
          },
        }
      );

      console.log("Updated Booked Seats:", getResponse.data);

      const combinedBookedSeats = getResponse.data.flatMap((booking) =>
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

  return (
    <>
      <GlobalStyle />
      <div className="min-h-screen w-screen booking-gradient text-white font-poppins flex flex-row overflow-x-hidden">
        {/* Selected Seats Section (Sidebar) */}
        <div className="w-[300px] relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/75 p-7.5 flex flex-col items-center justify-start backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-2.5">{movieTitle}</h2>
            <div className="w-15 h-1.5 underline-gradient my-2.5"></div>
            <h3 className="text-lg font-semibold mb-6">Selected Seats</h3>
            <div className="w-full mb-6">
              {selectedSeats.length === 0 ? (
                <p className="opacity-70 text-center">No seats selected yet.</p>
              ) : (
                selectedSeats.map((seat, index) => (
                  <div
                    key={`${seat.row}-${seat.seat}`}
                    className="flex justify-between items-center p-2.5 bg-white/5 rounded-lg my-2 transition-transform hover:translate-x-1.25"
                  >
                    <span className="text-sm">{`Row ${seat.row} - Seat ${seat.seat}`}</span>
                    <button
                      onClick={() => handleRemoveSeat(index)}
                      className="bg-transparent border-none text-red-500 text-sm font-semibold cursor-pointer transition-colors hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={handlePurchase}
              className="w-[85%] p-3 button-gradient border-none rounded-6.25 text-white text-base font-semibold cursor-pointer shadow-md hover:shadow-lg transition-all hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Purchase ({calculateTotalPrice()} Rs)
            </button>
            {error && <p className="text-red-500 font-medium mt-2.5 text-sm">{error}</p>}
          </div>
        </div>

        {/* Booking Interface */}
        <div className="scrollable-booking flex-1 p-10 text-center bg-white/5 overflow-y-auto h-screen">
          <h3 className="text-xl font-semibold mb-6">Select Date</h3>
          <div className="flex justify-center gap-3.75 mb-6">
            {[21, 22, 23, 24, 25, 26, 27].map((date) => (
              <button
                key={date}
                className={`bg-gray-700 text-white border-none px-5 py-2.5 rounded-full cursor-pointer font-medium transition-all ${
                  selectedDate === date
                    ? "button-gradient shadow-md"
                    : "hover:bg-gray-500"
                }`}
                onClick={() => handleDateSelection(date)}
              >
                {date} Mar
              </button>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-6">Select Time</h3>
          <div className="flex justify-center gap-3.75 mb-6">
            {["8:40", "11:10", "14:00", "18:15", "20:30", "23:30"].map((time) => (
              <button
                key={time}
                className={`bg-gray-700 text-white border-none px-5 py-2.5 rounded-full cursor-pointer font-medium transition-all ${
                  selectedTime === time
                    ? "button-gradient shadow-md"
                    : "hover:bg-gray-500"
                }`}
                onClick={() => handleTimeSelection(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center p-5">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center mb-2.5">
                <span className="w-10 text-white text-center font-semibold mr-2.5">
                  {String.fromCharCode(65 + rowIndex)}
                </span>
                {Array.from({ length: 15 }).map((_, seatIndex) => {
                  const isBooked = bookedSeats.some(
                    (seat) =>
                      seat.row === String.fromCharCode(65 + rowIndex) &&
                      seat.seat === seatIndex + 1
                  );
                  const isSelected = selectedSeats.some(
                    (seat) =>
                      seat.row === String.fromCharCode(65 + rowIndex) &&
                      seat.seat === seatIndex + 1
                  );

                  return (
                    <div
                      key={seatIndex}
                      className={`w-8.75 h-8.75 m-1.25 flex justify-center items-center bg-gray-600 cursor-pointer rounded-lg text-sm transition-all shadow-sm ${
                        isBooked
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-green-400 shadow-md"
                          : "hover:bg-blue-300 hover:scale-110"
                      }`}
                      onClick={() =>
                        !isBooked &&
                        handleSeatSelection(
                          String.fromCharCode(65 + rowIndex),
                          seatIndex + 1
                        )
                      }
                    >
                      {!isBooked && !isSelected ? seatIndex + 1 : ""}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="screen-gradient text-white text-center w-4/5 p-3.75 mb-10 screen-arc text-2xl font-semibold shadow-lg translate-y-2.5">
              Screen
            </div>
            <div className="mt-10 flex justify-center gap-5 text-sm">
              <div className="flex items-center">
                <div className="w-6.25 h-6.25 bg-gray-600 rounded shadow-sm"></div>
                <span className="ml-1.25">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6.25 h-6.25 bg-gray-400 rounded shadow-sm"></div>
                <span className="ml-1.25">Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-6.25 h-6.25 bg-green-400 rounded shadow-sm"></div>
                <span className="ml-1.25">Selected</span>
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
    </>
  );
};

export default Booking;