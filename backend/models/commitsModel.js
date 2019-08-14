const mongoose = require("mongoose");

const commitsSchema = mongoose.Schema({
  postId: {type: String, required: true},
  comment: {type: String, required: true},
});
module.exports = mongoose.model("PostCommit", commitsSchema);
