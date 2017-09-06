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
	hack=new Hacks({"title":"Test"}).save();
	res.send('Got a PUT request at /user');
});

/*
PUT request for upvoting a hack
*/ 
router.put("/upvote/:hack_id",function(req,res){
	var $ret={
		"status":"failure"
	}
	var params=req.params;
	try{
		Hacks.findOneAndUpdate({id:params.hack_id,deleted_at:null,approved:true,hidden:false,deleted:false},
			{$set:{meta.upvotes:this.meta.upvotes+1}},{new:true},function(err,doc){
				if (!err) {
					$ret.status="success";
					$ret.data={};
					$ret.data.upvotes=doc.meta.upvotes;
				}
			});

	}
	catch(err){
		$ret.short_message=error.message;
		$ret.long_message="The upvote failed."
	}

	res.json($ret);
});

module.exports = router;