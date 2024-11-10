const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  movieTitle: String,
  theatreName: String,
  showTime: String,
  seats: Array,
  totalAmount: Number,
});
BookingSchema.set('id', false);

module.exports = mongoose.model('Booking', BookingSchema);
