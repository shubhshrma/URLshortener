var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');


var conn="mongodb://localhost:27017/urlshortener";

/* GET home page. */
router.get('/new/:url(*)', function(req, res, next) {
	
  
  mongodb.MongoClient.connect(conn,function(err,db){
  	
  	if (err) {
    	console.log("Unable to connect to server", err);
    } 
    else {
    	console.log("Connected to server");

    	var params = req.params.url;
    	
      if(validUrl.isUri(params)){
        var shortCode=shortid.generate();

        var obj={url:params , short:shortCode};

        db.collection('links').insert([obj]);
        res.json({ originalUrl:params , shortUrl:"localhost:3000/"+shortCode});
        //closing connection not sure
        db.close();
      }
      else{
        console.log("Error, make sure you enter a valid URL .");
      }
    };
    

  });
});

router.get('/:short',function(req,res,next){
  var conn="mongodb://localhost:27017/urlshortener";
   mongodb.MongoClient.connect(conn,function(err,db){
    if (err) {
      console.log("Unable to connect to server", err);
    }
    else{
      console.log("Connected to server");
      var params=req.params.short;

      var findLink=function(db,callback){};
      findLink(db,function(){
        db.close();
      });


    }
   });
});

module.exports = router;
