const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
  numOflikes:{ type: String , required: true },
  userIdThatLiked:{ type: String , required: true }
});

module.exports = mongoose.model("Post", postSchema);
