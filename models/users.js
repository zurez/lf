var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var hacks=new Schema({
	name:String,
	auth_provider:String,
	access_token:String,
	admin:Boolean,
	dob:Date
	remember_me:{type:Boolean,default:true}
	avatar_url:String,
	bio_url:String,
	language:{type:String,default:'english'},
	gender:{type:String},


	

});
/*Update the updated field.*/ 
users.pre('save',function(next){
	var updated_at=new Date();
	this.meta.updated_at=updated_at;
	next();
});


var Hacks = mongoose.model('Hacks',hacks);
module.exports=Hacks;