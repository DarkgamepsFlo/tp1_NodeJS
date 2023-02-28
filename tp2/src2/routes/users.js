const express = require("express");
const router = express.Router();
const {createUser, createWatchlist, findAllUsers} = require("../controllers/users");

router.post("/create", createUser);
router.post("/createWatchlist", createWatchlist)
router.get("/findUser", findAllUsers)

module.exports = router;
