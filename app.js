var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    flash           = require("connect-flash"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override");
               
    
    
//  Requiring Routes
var camgroundRoutes  = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index");

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const databaseUri = process.env.DATABASEURL || "mongodb://heroku_dfvjvjb3:le2312md0nltclinkgcgf4bgn8@ds231725.mlab.com:31725/heroku_dfvjvjb3";
mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));



// mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// seedDB(); // Seed campgrounds (delete, populate)

// Passport Config
app.use(require("express-session")({
   secret: "For score and seven years ago",
   resave: false, 
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds", camgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("** The YelpCamp Server Has Started! **");
});