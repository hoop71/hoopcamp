var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
mongoose.Promise = global.Promise;

var data = [
   {
      name: "Cloud's Rest", 
      image: "https://i.imgur.com/lJfpLPDl.jpg",
      description: "Spicy jalapeno bacon ipsum dolor amet t-bone aliqua est, commodo enim elit jerky laboris deserunt short ribs. Duis pork belly commodo qui nulla. Meatloaf ground round turducken, boudin sed kevin tongue tempor ham tenderloin. Chicken pancetta capicola in drumstick filet mignon tenderloin. Ball tip shank andouille capicola flank swine doner. Fatback kevin id, prosciutto cow excepteur lorem non. Alcatra corned beef short loin cow.",
   },
   {
      name: "Mountain High", 
      image: "https://i.imgur.com/1zKrRW5l.jpg",
      description: "Spicy jalapeno bacon ipsum dolor amet t-bone aliqua est, commodo enim elit jerky laboris deserunt short ribs. Duis pork belly commodo qui nulla. Meatloaf ground round turducken, boudin sed kevin tongue tempor ham tenderloin. Chicken pancetta capicola in drumstick filet mignon tenderloin. Ball tip shank andouille capicola flank swine doner. Fatback kevin id, prosciutto cow excepteur lorem non. Alcatra corned beef short loin cow.",
   },
   {
      name: "Ecuador Peak", 
      image: "https://i.imgur.com/Et0A7C5l.png",
      description: "Spicy jalapeno bacon ipsum dolor amet t-bone aliqua est, commodo enim elit jerky laboris deserunt short ribs. Duis pork belly commodo qui nulla. Meatloaf ground round turducken, boudin sed kevin tongue tempor ham tenderloin. Chicken pancetta capicola in drumstick filet mignon tenderloin. Ball tip shank andouille capicola flank swine doner. Fatback kevin id, prosciutto cow excepteur lorem non. Alcatra corned beef short loin cow.",
   }
];

function seedDB(){
   // Remove all campgrounds 
   Campground.remove({}, function(err){
   //    if(err){
   //       console.log(err);
   //    } else { 
   //       console.log("Camprounds Destroyed");
   //       // add a few campgrounds
   //       data.forEach(function(seed){
   //          Campground.create(seed, function(err, campground){
   //             if(err){
   //                console.log(err);
   //             } else {
   //                console.log("added data");
   //                // create a comment
   //                Comment.create(
   //                   {
   //                      text: "This place is great, but I wish there was internet",
   //                      author: "Homer"
   //                   }, function(err, comment){
   //                      if(err){
   //                         console.log(err);
   //                      } else { 
   //                         campground.comments.push(comment);
   //                         campground.save();
   //                         console.log("Created New Comment");
   //                   }
                  
   //                });
   //             }
   //          });
   //       });
   //    }
   });
   
   
}
module.exports = seedDB;
