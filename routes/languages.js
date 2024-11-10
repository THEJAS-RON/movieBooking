const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ languages: ["English", "Hindi", "Telugu"] });
});

module.exports = router;
