const express = require("express");
const router = express.Router();
const {insertOneMovies} = require("../controllers/movies");

router.post("/insertMovie", insertOneMovies);

module.exports = router;