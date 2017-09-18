var express = require('express');
var router = express.Router();
var User=require('./../models/users');
var jwt    = require('jsonwebtoken');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var Config=require("./../config");
var app = express();
app.set('token_secret', Config.secret);
router.post("/authenticate",function(req,res){
	/*Google Backend Verification*/
	const params=req.body;
	// var google_token=params.google_token; 
	// 
	console.log(params);
	$data={
		name:params.name,
		auth_provider:"google",
		access_token:params.access_token,
		email:params.email

		};
	User.findOrCreate($data,function(err,user){
		if (err) {
			res.sendStatus(403).send({status:false});
		}
		console.log(app.get('token_secret'));
		console.log(user);
		var token = jwt.sign(user,app.get('token_secret'), {
      		expiresInMinutes: 1440
    		});
		console.log(token);
		res.json({
          success: true,
          token: token
        });
		
	});
});

router.post
module.exports = router;
