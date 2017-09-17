var express = require('express');
var router = express.Router();

/*Save image in S3 bucket and respond with image link*/ 

router.post('/save',function(req,res){
	res.send("https://dummyimagebyzurezurl.com");
});
module.exports = router;
