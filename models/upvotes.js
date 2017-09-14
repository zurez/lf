var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var upvotes=new Schema({
	hack_id:{type:Schema.Types.ObjectId,ref:'hack'},
	user_id:{type:Schema.Types.ObjectId,ref:'users'},
	created_at:{type:Date,default:Date.now},
	updated_at:{type:Date,default:Date.now},
	deleted_at:Date,
	deleted:{type:Boolean,default:false}
	status:{
		type:String,
		enum:["active","deleted","removed"],
		default:"active"
	},
});

var Upvotes = mongoose.model('Upvotes',upvotes);
module.exports=Upvotes;