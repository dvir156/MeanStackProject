const express = require("express");
const userProfile = require("../controllers/userProfile");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


router.post("/createdata",checkAuth,userProfile.newInfo);
//
// router.put("/:id",checkAuth,userProfile);
//
 router.get("/userinfo",checkAuth,userProfile.getAllUserData);

module.exports = router;
