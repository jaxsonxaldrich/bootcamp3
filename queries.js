/* Fill out these functions using Mongoose queries*/
var config = require('./config.js');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Listing = require('./ListingSchema.js');

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  mongoose.connect(config.db.uri);
  Listing.findOne({ $where : "this.name == 'Library West' " }, function(err, docs){
    console.log(docs);
    })
}
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  mongoose.connect(config.db.uri);
  Listing.findOneAndRemove({ $where : "this.code == 'CABL' " }, function(err, docs){
    console.log(docs);
    }) 
}
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  mongoose.connect(config.db.uri);
  Listing.findOneAndUpdate({ $where : "this.name == 'Phelps Laboratory' " },{ $set: { address: '1953 Museum Rd, Gainesville, FL 32603' }}, function(err, docs){
  })
  Listing.findOne({ $where : "this.name == 'Phelps Laboratory' " }, function(err, docs){
    docs.updated_at = new Date();
    console.log(docs);
    })
   
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  mongoose.connect(config.db.uri);
  Listing.find(function(err, docs){
    console.log(docs);
    })
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
