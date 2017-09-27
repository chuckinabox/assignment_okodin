var express = require("express");
var app = express();

// ----------------------------------------
// Body Parser
// ----------------------------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["asdf1234567890qwer"]
  })
);

// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));

// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header("Referer") || "/";
  next();
});

// ----------------------------------------
// Logging
// ----------------------------------------
var morgan = require("morgan");
var morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

// ----------------------------------------
// Routes
// ----------------------------------------
var loginRouter = require("./routers/login")(app);
app.use("/", loginRouter);
var userRouter = require("./routers/user")(app);
app.use("/user", userRouter);

// ----------------------------------------
// Template Engine
// ----------------------------------------
var expressHandlebars = require("express-handlebars");
var heightConverter = require("./helpers/heightConverter");
var kidConverter = require("./helpers/kidConverter");

var hbs = expressHandlebars.create({
  helpers: {
    heightConverter,
    kidConverter
  },
  partialsDir: "views/",
  defaultLayout: "application"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// ----------------------------------------
// Server
// ----------------------------------------
// var port = process.env.PORT || process.argv[2] || 3000;
// var host = "localhost";
//
// var args;
// process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);
//
// args.push(() => {
//   console.log(`Listening: http://${host}:${port}`);
// });
//
// app.listen.apply(app, args);
app.listen(3000, console.log("Listening to port 3000"));

module.exports = app;
