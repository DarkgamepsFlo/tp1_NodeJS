const express = require("express");
const router = express.Router();
const {insertOneMovies, insertOneItem, updatestatus} = require("../controllers/movies");

router.post("/insertMovie", insertOneMovies);
router.post("/insertItem", insertOneItem);
router.post("/updateStatus", updatestatus);

module.exports = router;