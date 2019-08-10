const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const profileRoutes = require("./routes/userprofile");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

require('dotenv').config();
mongoose
  .connect("mongodb+srv://dvir16:s56SasepLBYNUDXi@cluster0-7vdf2.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


/*                              Local mongo                                  */
   // mongoose.connect('mongodb://localhost:27017/MeanStackProject', {useNewUrlParser: true});
   // const connection = mongoose.connection;
   // connection.on('error', (error) => {
   // console.log('Error connecting to MongoDB', error);
   // });
   // connection.once('open', () => {
   // console.log('Connected to MongoDB');
   // });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/userprofile", profileRoutes);

module.exports = app;
