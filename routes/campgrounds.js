var express       = require("express");
var router        = express.Router();
var Campground    = require("../models/campground");
var middleware    = require("../middleware");



// INDEX - show all campgrounds
router.get("/", function(req, res){
      // get all camgrounds then render that find
      Campground.find({}, function(err, allCampgrounds){
         if(err){
            console.log(err);
         } else { 
            res.render("campgrounds/campgrounds", {campgrounds:allCampgrounds});
         }
      });
      
      // render campgrounds.ejs |\/names data |\/ var campgrounds
});

// Create Route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Create Route
router.post("/", middleware.isLoggedIn, function(req, res) {
   //  get data from form 
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
   var author = {
      id: req.user._id, 
      username: req.user.username
   };
   var newCampground = {name: name, price: price, image: image, description: desc, author: author};
   // create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
         console.log(err);
      } else {
         // reddirect back to campground route
         console.log(newlyCreated);
         req.flash("success", "Campground successfully created");
         res.redirect("/campgrounds");
      }
   });
});

// Show more info about one campground
router.get("/:id", function(req, res) {
   // find campground with provided ID
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err || !foundCampground){
         req.flash("error", "Campground not found");
         res.redirect("back");
      } else {
         console.log(foundCampground);
          // render show template with that campground
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
   // is user logged in
   Campground.findById(req.params.id, function(err, foundCampground){
   res.render("campgrounds/edit", {campground: foundCampground});
   });
});

// Update Campground Entry PUT Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      req.flash("success", "Campground successfully updated");
      res.redirect("/campgrounds/" + req.params.id);
   });
});   

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
         req.flash("success", "Campground successfully deleted");
         res.redirect("/campgrounds");
   });
});

module.exports = router;