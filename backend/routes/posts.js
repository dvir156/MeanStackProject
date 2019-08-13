const express = require("express");
const PostController = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const exractFile = require("../middleware/file");
const router = express.Router();

router.post("", checkAuth,exractFile,PostController.createPost);

router.put("/:id", exractFile,PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
