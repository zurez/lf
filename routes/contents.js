var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var Hacks=require('./../models/hacks');
var ObjectId = require('mongoose').Types.ObjectId; 
router.get('/',function(req,res,next){
	res.send("You have reached content");
});


router.get('/user/:id-:name',function(req,res){
	res.send("Route two within contents"+ req.params.id+req.params.name)
});

/*
	PUT Request for bookmarking a hack
*/ 
router.put('/bookmark/:action/:hack_id',function(req,res){
	/* Validation Block*/
	/* */
	var ret="failure";
	if (params.action=="add") {
		var $process={'meta.bookmarks':1}
	}else if(params.action=="remove"){
		var $process={'meta.bookmarks':-1};
	}else{
		res.json(ret);

	}

	try{
		/*Add record in the Bookmark table for that user*/

		Hacks.findOneAndUpdate({id:params.hack_id,deleted_at:null,approved:true,hidden:false,deleted:false},
			{$inc:$process},{new:true},function(err,doc){
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
	}catch(err){

	}
});

/*
POST request for submitting a hack.
ToDo: Add validation for duplicate entry.
*/ 

router.post("/submit",function(req,res){
	var params=req.body;
	/*Sanitize the params and add validations*/
	/*Do User Validation and get user_id*/ 
	/*Convert params to a kv array*/
	var to_save={
		title:params.title,
		category:params.category,
		subcategory:params.subcategory,
		body:params.body,
		external_url:params.external_url,
		internal_url:params.internal_url,
		author:params.author,
		
		approved:params.true

	};
	hack=new Hacks(to_save).save(function(err,doc){
		console.log(err);
		
		
		
		res.send(doc);
	});
	res.send('saved');
});

router.post("/retrieve",function(req,res){
	/*
	ToDO: Add validation parameters
	*/ 
	Hacks.find({},function(err,doc){
		
	res.json(doc);
	});
	
});
/*PUT approve/suspend a hack*/ 
router.put("/approval/:action/:hack_id",function(req,res){
	params=req.params;
	if (params.action=="approve") {
		var $process={'approved':true}
	}else if(params.action=="remove"){
		var $process={'approved':false};
	}else{
		res.json(res.json({"status":"failure","short_message":"Invalid Action"}));

	}

	hack_id=new ObjectId(params.hack_id);
	// 
	try{
		
		Hacks.findOneAndUpdate({_id:hack_id,deleted_at:null,hidden:false,deleted:false},
			{$set:$process},{new:true},function(err,doc){
				/*Handler*/
				if(err){console.log(err);res.json({"status":"failure","short_message":"ServerError#Contents#001"})}
				else if(!doc){res.json({"status":"failure","short_message":"No Matching Record"})}
				else{res.json({"approved":doc.approved});}
			
			});

	}
	catch(err){
		res.json({"status":"failure","short_message":"ServerError#Contents#002"})
	}

	
});

/*
PUT request for upvoting a hack
*/ 
router.put("/upvote/:action/:hack_id",function(req,res){
	params=req.params;
	if (params.action=="add") {
		var $process={'meta.upvotes':1}
	}else if(params.action=="remove"){
		var $process={'meta.upvotes':-1};
	}else{
		res.json(res.json({"status":"failure","short_message":"Invalid Action"}));

	}

	hack_id=new ObjectId(params.hack_id);
	// 
	try{
		
		Hacks.findOneAndUpdate({_id:hack_id,deleted_at:null,approved:true,hidden:false,deleted:false},
			{$inc:$process},{new:true},function(err,doc){
				/*Handler*/
				if(err){res.json({"status":"failure","short_message":"ServerError#Contents#001"})}
				else if(!doc){res.json({"status":"failure","short_message":"No Matching Record"})}
				else{res.json({"upvotes":doc.meta.upvotes});}
			
			});

	}
	catch(err){
		res.json({"status":"failure","short_message":"ServerError#Contents#002"})
	}

	
});

module.exports = router;