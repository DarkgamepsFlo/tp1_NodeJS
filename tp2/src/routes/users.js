const express = require("express");
const { Collection } = require("mongodb");
const router = express.Router();
const { createUser } = require("../controllers/users");
const { findOne } = require('../services/db/crud');

router.get("/create", createUser);

router.get('/test1', findOne(Collection, ));

module.exports = router;
