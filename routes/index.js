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

      db.collection('links').findOne({url:params},{short:1,_id:0},function(err,doc){
        //if new address already in database
        if(doc!=null){

            res.json({ originalUrl:params , shortUrl:"localhost:3000/"+doc.short});
        }
        //new address not present in database 
        else{
          
        if(validUrl.isUri(params)){
        var shortCode=shortid.generate();
        
        
        var obj={url:params , short:shortCode};
        
        db.collection('links').insert([obj]);
        res.json({ originalUrl:params , shortUrl:"localhost:3000/"+shortCode});
        //closing connection not sure
        db.close();
      }

      else{
        res.json({error:"Error, make sure you enter a valid URL with a valid protocol."});
      }
        
        }

      });
    	
      
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

      var findLink=function(db,callback){
        db.collection("links").findOne({short:params},{url:1,_id:0},function(err,doc){
          if(err)

          if(doc!=null)
            res.redirect(doc.url);
          else
            res.json({error:"No short URL found for your entered address.Please add your address in the database with /new route."});
        });
      };
      findLink(db,function(){
        db.close();
      });


    }
   });
});

module.exports = router;
