var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var reports=new Schema({
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

var Reports = mongoose.model('Reports',reports);
module.exports=Reports;