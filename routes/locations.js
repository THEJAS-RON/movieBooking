const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ locations: ["Mumbai", "Delhi", "Bangalore"] });
});

module.exports = router;
