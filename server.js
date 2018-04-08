  var express = require("express");
  var dotenv = require("dotenv").config();
  var bodyParser = require("body-parser");
  var logger = require("morgan");
  var passport = require("passport");
  var LocalStrategy= require("passport-local");
  var passportLocalMongoose = require("passport-local-mongoose");
  var path = require("path");
  var db = require("./db/db.js")
  var User = require("./models/user")

//Initialize Express
  var app = express();
  var PORT = process.env.PORT || 8080;

//Express session
  app.use(require("express-session")({
    secret: "This is our secret session 2016 for users!",
    resave: false,
    saveUninitialized: false
  }));

//Passport
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(function(user,done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id,done) {
    User.findById(id, function (err,user) {
      done(err,user);
    });
  });

//Body-Parser
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Landing
  app.get("/", autoRedirect, function(req, res){
     res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

//Public files <this needs to stay right below app.get("/")!!!!
  app.use(express.static(__dirname + "/public"))

//LOCAL AUTH
  app.post("/register", function(req, res) {

    User.register(new User({
      teamId: req.body.teamId,
	    firstName: req.body.firstName,
	    lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      userType: req.body.userType,
      picture: "https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png",
      addressOne: req.body.addressOne,
      addressTwo: req.body.addressTwo,
      city: req.body.city,
      country: req.body.country,
      zip: req.body.zip,
      phone: req.body.phone,
      phoneType: req.body.phoneType,
    }),

    req.body.password, function(err, user) {
       if(err){
        res.sendFile(path.resolve(__dirname, "public", "error.html"));
        console.log(err);
       } else {

      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
      }
    })
  });

  app.post("/login", passport.authenticate("local", {
    // successRedirect: "/manager",
    failureRedirect: "/"
  }), function(req, res) {
      reRoute(req,res);
  });

//Functions for Auth
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/");
  }

  function reRoute(req,res){
     if (req.user.userType === "manager") {
      res.redirect("/manager");
    } else {
      res.redirect("/employee");
    }
  }

  function autoRedirect(req,res,next){
    if(req.isAuthenticated()){
      reRoute(req,res);
    } else {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    }
  }

 app.get('/user', function(req,res){
    res.send(req.user)
  });

//Restricting routes
  app.get("/login", function(req,res) {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
  });

  app.get("/register", function(req,res) {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
  });

  app.get("/manager", isLoggedIn, function(req,res) {
    if (req.user.userType === "manager") {
        res.sendFile(path.resolve(__dirname, "public", "index.html"))
    } else {
        res.sendFile(path.resolve(__dirname, "public", "notauth.html"))
    }
  });

  app.get("/manager/*", isLoggedIn, function(req,res) {
    if (req.user.userType === "manager") {
        res.sendFile(path.resolve(__dirname, "public", "index.html"))
    } else {
        res.sendFile(path.resolve(__dirname, "public", "notauth.html"))
    }
  });

  app.get("/employee", isLoggedIn, function(req,res) {
    if (req.user.userType === "employee") {
      res.sendFile(path.resolve(__dirname, "public", "index.html"))
    } else {
      res.redirect("/manager");
    }
  });

  app.get("/employee/*", isLoggedIn, function(req,res) {
    if (req.user.userType === "employee") {
      res.sendFile(path.resolve(__dirname, "public", "index.html"))
    } else {
      res.redirect("/manager");
    }
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  var routes = require('./controllers/db_controller.js');
  app.use('/', isLoggedIn, routes);

  app.get("*", function(req,res) {
    res.sendFile(path.resolve(__dirname, "public", "404.html"))
  })

//Port Listener
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
