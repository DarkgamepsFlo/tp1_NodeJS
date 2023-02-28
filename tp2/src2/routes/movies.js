const express = require("express");
const router = express.Router();
const {insertOneMovies, insertOneItem, updatestatus, findWatchlist, findWatchFilm} = require("../controllers/movies");

router.post("/insertMovie", insertOneMovies);
router.post("/insertItem", insertOneItem);
router.post("/updateStatus", updatestatus);
router.get("/findWatch", findWatchlist);
router.get("/findFilm", findWatchFilm);

module.exports = router;