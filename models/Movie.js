const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  id: String,
  row: String,
  number: Number,
  isAvailable: Boolean,
  price: Number,
});

const ShowTimeSchema = new mongoose.Schema({
  id: String,
  time: String,
  seats: [SeatSchema],
});

const TheatreSchema = new mongoose.Schema({
  id: String,
  name: String,
  location: String,
  showTimes: [ShowTimeSchema],
});

const MovieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  language: String,
  theatres: [TheatreSchema],
});

module.exports = mongoose.model('Movie', MovieSchema);
