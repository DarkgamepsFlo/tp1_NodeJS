const express = require("express");
const router = express.Router();
const {createUser, createWatchlist} = require("../controllers/users");

router.post("/create", createUser);
router.post("/createWatchlist", createWatchlist)

module.exports = router;
