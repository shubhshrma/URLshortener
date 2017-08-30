var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');

/* GET home page. */
router.get('/new/:url(*)', function(req, res, next) {
	
  var conn="mongodb://localhost:27017/urlshortener";
  mongodb.MongoClient.connect(conn,function(err,db){
  	
  	if (err) {
    	console.log("Unable to connect to server", err);
    } 
    else {
    	console.log("Connected to server");
    	var params = req.params.url;
    	insertLink={url: params, short: "test"};
        db.collection('links').insert([insertLink]);
        res.send(params);
    };
    

  });
});

module.exports = router;
