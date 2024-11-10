const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/locations', require('./routes/locations'));
app.use('/languages', require('./routes/languages'));
app.use('/movies', require('./routes/movies'));
app.use('/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
