const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const keys = require("./config/keys");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const User = require("./model/Users");
const flash = require("connect-flash");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  keys.MONGODB_URL,
  { useNewUrlParser: true }
);

var session = require("express-session"),
  bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(
  session({
    secret: "skdcnkajnclaskjncalcnajkn",
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.get("/register", function(req, res) {
  res.render("register", {});
});

app.post("/register", function(req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err) {
      if (err) {
        req.flash("error", err.message);
        return res.render("register");
      }
      res.redirect("/");
    }
  );
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT);
