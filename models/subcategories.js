var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var subcategories=new Schema({
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

var Subcategories = mongoose.model('Subcategories',subcategories);
module.exports=Subcategories;