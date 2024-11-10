const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

const generateBookingId = async () => {
  const lastBooking = await Booking.findOne().sort({ id: -1 }).exec(); 
  const lastId = lastBooking ? lastBooking.id : 'b0';

  const numericId = parseInt(lastId.substring(1), 10) + 1;
  return `b${numericId}`;
};

router.post('/', async (req, res) => {
  const { movieId, theatreId, showTimeId, seatIds } = req.body;
  const movie = await Movie.findOne({ _id: movieId });
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  const theatre = movie.theatres.find(t => t.id === theatreId);
  if (!theatre) return res.status(404).json({ error: "Theatre not found" });

  const showTime = theatre.showTimes.find(st => st.id === showTimeId);
  if (!showTime) return res.status(404).json({ error: "Show time not found" });
  // console.log(showTime);

  const filteredseats = showTime.seats.filter(seat => seatIds.includes(seat.id));
  console.log(filteredseats);
  if (filteredseats.length != seatIds.length) return res.status(404).json({ error: "Seats not found" });
  if (filteredseats.some(seat => !seat.isAvailable)) return res.status(400).json({ error: "One or more seats are not available" });

  filteredseats.forEach(seat => seat.isAvailable = false);

  const totalAmount = filteredseats.reduce((sum, seat) => sum + seat.price, 0);
  await movie.save();

  const bookingId = await generateBookingId();

  const booking = await Booking.create({
    id: bookingId,
    movieTitle: movie.title,
    theatreName: theatre.name,
    showTime: showTime.time,
    seats: filteredseats,
    totalAmount: totalAmount,
  });

  res.json(booking);
});

// Get Booking Details
router.get('/:bookingId', async (req, res) => {
  const {bookingId} = req.params
  const booking = await Booking.findOne({id: bookingId});
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json(booking);
});

module.exports = router;
