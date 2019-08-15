const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const profileRoutes = require("./routes/userprofile");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const storiesRoutes = require('./routes/stories');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// require('dotenv').config();
// mongoose
//   .connect("mongodb+srv://dvir16:"+process.env.mongodbpassword+"@cluster0-7vdf2.mongodb.net/node-angular?retryWrites=true")
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });


/*                              Local mongo                                  */
mongoose.connect('mongodb://localhost:27017/MeanStackProject', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('Error connecting to MongoDB', error);
});
connection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.set('views', path.join(__dirname, 'backend/views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(cookieParser());

app.use("/images", express.static(path.join("backend/images")));

app.use("/api/stories", storiesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/userprofile", profileRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
