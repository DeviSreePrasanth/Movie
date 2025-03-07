const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieName: String,
  date: String,
  time: String,
  seats: [String], 
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
