const express = require("express");
const router = express.Router();
const { createUser, findUser, findAllUser, insertUser, insertManyUser, updateUser, updateManyUser, replaceUser, deleteUser, deleteManyUser } = require("../controllers/users");

router.get("/create", createUser);
router.get('/find', findUser);
router.get('/findAll', findAllUser);
router.get('/insert', insertUser);
router.get('/insertMany', insertManyUser);
router.get('/update', updateUser);
router.get('/updateMany', updateManyUser);
router.get('/replace', replaceUser);
router.get('/delete', deleteUser);
router.get('/deleteMany', deleteManyUser);

module.exports = router;
