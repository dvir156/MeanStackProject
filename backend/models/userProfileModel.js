const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number , required: true },
  //countryName: { type: String , required: true },
  country: {type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true}
});

module.exports = mongoose.model("UserData", userProfileSchema);
