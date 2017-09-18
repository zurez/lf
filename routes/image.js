var express = require('express');
var router = express.Router();
var multer  = require('multer');
const Config=require("./../config");
const uuid = require('node-uuid');
/*Save image in S3 bucket and respond with image link
http://www.joshsgman.com/upload-to-and-get-images-from-amazon-s3-with-node-js/
*/ 
async function send_to_aws($file_data,$file_name) {
	const AWS = require('aws-sdk');
	AWS.config.loadFromPath('./aws_config.json');
	const s3 = new AWS.S3();
	bucketParams = {Bucket:Config.aws_bucket};
	var s3Bucket = new AWS.S3( { params:bucketParams } )
	const $data={Key:$file_name, Body:$file_data};
	s3Bucket.putObject($data, function(err, data){

	  	if (err) { console.log(err);return {"status":false,"url":""};} 
		else {
			
			const $urlParams = {Bucket:Config.aws_bucket, Key:$file_name};
			s3Bucket.getSignedUrl('getObject',$urlParams, function(err, url){
				console.log(url);
				return {"status":true,"url":url};
			})
	    }
	});
}

router.post('/save',function(req,res){

	const $file_name=uuid.v4()+".png";
	const $file_data=req.body.image;
	const AWS = require('aws-sdk');
	AWS.config.loadFromPath('./aws_config.json');
	const s3 = new AWS.S3();
	bucketParams = {Bucket:Config.aws_bucket};
	var s3Bucket = new AWS.S3( { params:bucketParams } )
	buf = new Buffer($file_data.replace(/^data:image\/\w+;base64,/, ""),'base64')
	const $data = {
		Key:$file_name, 
		Body: buf,
		ContentEncoding: 'base64',
		ContentType: 'image/png'
	};

	s3Bucket.putObject($data, function(err, data){

	  	if (err) { console.log(err);return {"status":false,"url":""};} 
		else {
			
			const $urlParams = {Bucket:Config.aws_bucket, Key:$file_name};
			s3Bucket.getSignedUrl('getObject',$urlParams, function(err, url){
				console.log(url);
				res.json({"status":true,"url":url});
			})
	    }
	});
	
});
module.exports = router;
