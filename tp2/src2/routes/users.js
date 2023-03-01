const express = require("express");
const router = express.Router();
const {createUser, createWatchlist, findAllUsers, updateClient} = require("../controllers/users");

router.post("/create", createUser);
router.post("/createWatchlist", createWatchlist);
router.get("/findUser", findAllUsers);
router.post("/updateUser", updateClient);

module.exports = router;
