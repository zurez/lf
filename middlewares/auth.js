/* Authentication MiddleWare for LoggedIn
    https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
*/
var jwt    = require('jsonwebtoken');
var Config=require('./config');
module.exports.auth=function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {

    // verifies secret and checks exp
    jwt.verify(token,Config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        
        req.decoded = decoded;    
        next();
      }
    });

  } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

      }
    
}