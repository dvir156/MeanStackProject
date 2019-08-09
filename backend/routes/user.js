const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();


router.post("/signup", UserController.createUser); // Dvir you pass here the reference and not function

router.post("/login", UserController.userLogin); // the same here

module.exports = router;
