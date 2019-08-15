const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  imageVideoPath: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
  date:{ type: Date , required: true },
});

module.exports = mongoose.model("Story", storySchema);
