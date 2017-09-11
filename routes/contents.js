var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var Hacks=require('./../models/hacks');
router.get('/',function(req,res,next){
	res.send("You have reached content");
});


router.get('/user/:id-:name',function(req,res){
	res.send("Route two within contents"+ req.params.id+req.params.name)
});


/*
POST request for submitting a hack.
ToDo: Add validation for duplicate entry.
*/ 

router.post("/submit",function(req,res){
	var params=req.params;
	/*Sanitize the params and add validations*/

	hack=new Hacks(params).save();
	res.send('saved');
});

router.delete("")

/*
PUT request for upvoting a hack
*/ 
router.put("/upvote/:action/:hack_id",function(req,res){
	 var ret=new Object();
	 ret={
		status:"failure",
		short_message:"Bad params passed.",
		long_message:"The upvote failed"
	};
	var params=req.params;
	console.log(params);
	if (params.action=="add") {
		var $process={'meta.upvotes':1}
	}else if(params.action=="remove"){
		var $process={'meta.upvotes':-1};
	}else{
		res.json(ret);

	}
	try{
		
		Hacks.findOneAndUpdate({id:params.hack_id,deleted_at:null,approved:true,hidden:false,deleted:false},
			{$inc:{'meta.upvotes':1}},{new:true},function(err,doc){
				if (err==null && doc!=null) {
				
					ret={
					status:"success",
					short_message:"success",
					data:{
						upvotes:doc.meta.upvotes
					}
				};
								
				}
				else{
					
					ret.short_message="Nothing to update.";
					ret.long_message="The upvote failed.";
					console.log(ret);
					
				}
			});

	}
	catch(err){
		ret.short_message=err.message;
		ret.long_message="A server error happened."
	}

	res.json(ret);
});

module.exports = router;