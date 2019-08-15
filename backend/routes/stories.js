const express = require("express");
const StoryController = require("../controllers/stories");
const checkAuth = require("../middleware/check-auth");
const exractFile = require("../middleware/file");
const router = express.Router();

router.post("", checkAuth,exractFile,StoryController.createStory);

router.put("/:id", exractFile,StoryController.updateStory);

router.get("", StoryController.getStory);

router.get("/:id", StoryController.getStory);

router.delete("/:id", checkAuth, StoryController.deleteStory);

module.exports = router;
