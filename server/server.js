require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Server error during signup' });
    }
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select('username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error fetching user details' });
  }
});

const seatBookingSchema = new mongoose.Schema({
  movieName: String,
  date: String,
  time: String,
  seats: [
    {
      row: String,
      seat: Number,
      price: Number,
    },
  ],
});

const SeatBooking = mongoose.model('SeatBooking', seatBookingSchema);

app.post('/api/bookSeats', async (req, res) => {
  const { movieName, date, time, seats } = req.body;

  try {
    if (!movieName || !date || !time || !Array.isArray(seats)) {
      throw new Error('Invalid booking data');
    }

    seats.forEach(seat => {
      if (!seat.row || typeof seat.seat !== 'number' || typeof seat.price !== 'number') {
        throw new Error('Invalid seat data');
      }
    });

    const newBooking = new SeatBooking({ movieName, date, time, seats });
    await newBooking.save();
    res.status(201).json({ message: 'Seats booked successfully!', data: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error.message);
    res.status(500).json({ message: 'Failed to book seats. Please try again.', error: error.message });
  }
});

app.get('/api/getBookedSeats', async (req, res) => {
  const { movieName, date, time } = req.query;

  try {
    const bookedSeats = await SeatBooking.find({
      movieName,
      date,
      time
    });

    res.json(bookedSeats);
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({ error: 'Failed to fetch booked seats' });
  }
});


app.listen(4000, () => console.log('Server running on port 4000'));
