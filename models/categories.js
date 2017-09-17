var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var categories=new Schema({
	user_id:{type:Schema.Types.ObjectId,ref:'users'},
	title:String,
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

var Categories = mongoose.model('Categories',categories);
module.exports=Categories;