const express = require("express");
const commitController = require("../controllers/commits");
const router = express.Router();


router.post("/commits", commitController.newCommit); // Dvir you pass here the reference and not function

router.get("/getcommit/:id", commitController.getCommits); // the same here

module.exports = router;
