const express = require("express");
const router = express.Router();
const {insertOneMovies, insertOneItem} = require("../controllers/movies");

router.post("/insertMovie", insertOneMovies);
router.post("/insertItem", insertOneItem)

module.exports = router;