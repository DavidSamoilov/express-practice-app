var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const moment = require("moment");

// members details json
const Members = require("./Members");
var app = express();

// getting logger middleware
const logger1 = require("./middleware/logger1")

// Init Logger middleware
// app.use(logger1);

// Gets all members
app.get("/api/members", (req, res) => res.json(Members));

// Get single member
app.get('/api/members/:id',(req, res) => {
  const found = Members.some(user => user.id === parseInt(req.params.id))
  if(found){
    res.json(Members.find(user => user.id === parseInt(req.params.id)))
  }else{
    res.status(400).json({msg:`No member with the id of ${req.params.id}`})
  }

})


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));

module.exports = app;
