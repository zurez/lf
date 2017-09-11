var fs = require('fs');
var image_path="./storage/images/";
var utility=require("utility.js");
/*
https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file
ToDo: Replace raw with S3 bucket
https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
*/ 


function save_file($imagefile) {
	var $ret="";
	try{
		var data = $imagefile.replace(/^data:image\/\w+;base64,/, "");
		var buf = new Buffer(data, 'base64');
		$name=utility.random_string()+"_"+new Date();
		var $filename= image_path+"/"+$name+"/"+".png";
		fs.writeFile('image.png', buf);
	}
	catch(err){

	}
	return $ret;
}