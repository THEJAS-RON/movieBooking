const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get Movies with optional filters
router.get('/', async (req, res) => {
  const { location, language } = req.query;
  const query = {};
  if (location) query['theatres.location'] = location;
  if (language) query.language = language;

  const movies = await Movie.find(query);
  res.json({ movies });
});

// Get Theatres for a Specific Movie
router.get('/:movieId/theatres', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ _id: movieId });
    
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    // console.log(movie.theatres)
    res.json({ theatres: movie.theatres });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
  }

});

router.get('/:movieId/theatres/:theatreId/showtimes', async (req, res) => {
  try {
    const { movieId, theatreId } = req.params;
    
    // Find the movie by its custom 'id' (movieId)
    const movie = await Movie.findOne({ _id: movieId });  // Find by _id (the custom movie ID)

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    console.log("Movie found:", movie.title);
    console.log("Theatres in movie:", movie.theatres);

    // Find the theatre within the movie by its custom 'id' (theatreId)
    const theatre = movie.theatres.find(t => t.id === theatreId);

    if (!theatre) {
      return res.status(404).json({ error: `Theatre with id ${theatreId} not found in movie ${movieId}` });
    }

    console.log("Theatre found:", theatre.name);
    res.json({ showtimes: theatre.showTimes });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});



module.exports = router;
