const express = require("express");
const userProfile = require("../controllers/userProfile");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


router.post("/createdata", checkAuth, userProfile.newInfo);

router.get("/userinfo/:id", checkAuth, userProfile.getAllUserData);

router.get("/checkprofile/:id",checkAuth,userProfile.profileExists);

module.exports = router;
