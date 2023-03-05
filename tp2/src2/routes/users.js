const express = require("express");
const router = express.Router();
const {createUser, createWatchlist, findAllUsers, updateClient} = require("../controllers/users");

// 1 //
router.post("/create", createUser);
// 3 //
router.post("/createWatchlist", createWatchlist);
// 7 //
router.get("/findUser", findAllUsers);
// 11 //
router.post("/updateUser", updateClient);

module.exports = router;
