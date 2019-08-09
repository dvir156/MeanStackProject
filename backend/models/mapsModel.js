const mongoose = require("mongoose");

const mapsSchema = mongoose.Schema({
  title: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true}
});

module.exports = mongoose.model("Maps", mapsSchema);
