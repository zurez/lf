const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const users=new Schema({
	name:String,
	auth_provider:String,
	email:String,
	access_token:String,
	admin:Boolean,
	dob:Date,
	remember_me:{type:Boolean,default:true},
	avatar_url:String,
	bio_url:String,
	language:{type:String,default:'english'},
	gender:{type:String}
});
users.plugin(findOrCreate);

/*Update the updated field.*/ 
users.pre('save',function(next){
	var updated_at=new Date();
	// this.meta.updated_at=updated_at;
	next();
});


var Users = mongoose.model('Users',users);
module.exports=Users;