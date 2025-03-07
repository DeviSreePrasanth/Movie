import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Payment from "./Payment";

const SelectedSeatsSection = styled.div`
  width: 30%;
  position: relative;
  background-image: url("./images/lion-king.jpg");
  background-size: cover;
  background-position: center;
  color: white;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const MovieNameUnderline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #d32f2f;
  margin-bottom: 20px;
`;

const SeatsList = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const SeatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
`;

const PurchaseButton = styled.button`
  width: 80%;
  padding: 10px;
  background-color: #d32f2f;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const BookingInterface = styled.div`
  width: 70%;
  padding: 20px;
  text-align: center;
  overflow-y: auto; /* Allow vertical scrolling if content overflows */
`;

const DateSelection = styled.div`
  margin-left: 250px;
  display: flex;
  gap: 20px;
`;

const TimeSelection = styled(DateSelection)``;

const DateButton = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &.selected {
    background-color: #d32f2f;
  }
`;

const TimeButton = styled(DateButton)``;

const SeatLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Screen = styled.div`
  position: relative;
  top: 350px;
  background-color: #d32f2f;
  color: white;
  text-align: center;
  width: 70%; /* Make the screen wider */
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 0 0 200px 200px;
  transform: translateY(20px);
  font-size: 1.2rem;
`;

const SeatRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RowName = styled.span`
  width: 30px; /* Increase width to fit larger text */
  color: white;
  text-align: center;
  margin-right: 5px;
  margin-left: 5px;
`;

const Seat = styled.div`
  width: 30px; /* Increase seat size */
  height: 30px;
  margin: 3px;
  background-color: #444;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &.booked {
    background-color: lightgrey;
    cursor: not-allowed;
  }
  &.selected {
    background-color: #76ff03;
  }
  &.available:hover {
    background-color: #90caf9;
  }
`;

const SeatLegend = styled.div`
  margin-top: 130px;
  display: flex;
  justify-content: space-around;
  width: 80%; /* Increase width for better alignment */
`;

const Legend = styled.div`
  width: 30px; /* Increase legend size */
  height: 30px;
  margin-right: 5px;
  display: inline-block;
  background-color: ${({ type }) =>
    type === "available"
      ? "#444"
      : type === "booked"
      ? "lightgrey"
      : "#76ff03"};
`;

const BookingContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1c1c1c;
  color: white;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Prevent horizontal scrolling */
`;

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
    if (
      bookedSeats.some((booked) => booked.row === row && booked.seat === seat)
    )
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
    } catch (err) {
      console.error("Error during purchase:", err);
      setError("Failed to complete purchase.");
    } finally {
      setShowPayment(false);
    }
  };

  return (
    <BookingContainer>
      <SelectedSeatsSection>
        <Overlay>
          <h2>{movieTitle}</h2>
          <MovieNameUnderline />
          <h3>Selected Seats:</h3>
          <SeatsList>
            {selectedSeats.map((seat, index) => (
              <SeatItem key={`${seat.row}-${seat.seat}`}>
                <span>{`Row ${seat.row} - Seat ${seat.seat}`}</span>
                <RemoveButton onClick={() => handleRemoveSeat(index)}>
                  Remove
                </RemoveButton>
              </SeatItem>
            ))}
          </SeatsList>
          <PurchaseButton onClick={handlePurchase}>
            Purchase ({calculateTotalPrice()}Rs)
          </PurchaseButton>
          {error && <p>{error}</p>}
        </Overlay>
      </SelectedSeatsSection>
      <BookingInterface>
        <h3>Select Date:</h3>
        <br />
        <DateSelection>
          {[21, 22, 23, 24, 25, 26, 27].map((date) => (
            <DateButton
              key={date}
              className={selectedDate === date ? "selected" : ""}
              onClick={() => handleDateSelection(date)}
            >
              {date}
            </DateButton>
          ))}
        </DateSelection>
        <h3>Select Time:</h3>
        <TimeSelection>
          {["8:40", "11:10", "14:00", "18:15", "20:30", "23:30"].map((time) => (
            <TimeButton
              key={time}
              className={selectedTime === time ? "selected" : ""}
              onClick={() => handleTimeSelection(time)}
            >
              {time}
            </TimeButton>
          ))}
        </TimeSelection>
        <SeatLayout>
          <Screen>Screen</Screen>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <SeatRow key={rowIndex}>
              <RowName>{String.fromCharCode(65 + rowIndex)}</RowName>
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
                  <Seat
                    key={seatIndex}
                    className={`${isBooked ? "booked" : ""} ${
                      isSelected ? "selected" : "available"
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
                  </Seat>
                );
              })}
            </SeatRow>
          ))}
          <SeatLegend>
            <Legend type="available" />
            <span>Available</span>
            <Legend type="booked" />
            <span>Booked</span>
            <Legend type="selected" />
            <span>Selected</span>
          </SeatLegend>
        </SeatLayout>
      </BookingInterface>
      {showPayment && (
        <Payment
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </BookingContainer>
  );
};

export default Booking;
