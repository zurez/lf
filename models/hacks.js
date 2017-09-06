var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var hacks=new Schema({
	title:String,
	parent_id:{type:Schema.Types.ObjectId,ref:'hack'},
	category:String,
	category_id:{type:Schema.Types.ObjectId,ref:'category'},
	subcategory:String,
	subcategory_id:{type:Schema.Types.ObjectId,ref:'subcategory'},
	body:String,
	external_url:String,
	internal_url:String,
	language:{type:String,default:'english'},
	demographic:{
		gender:{type:String,default:'all'},
		country:{type:String,default:'global'}
	},
	author:String,
	user_id:{type:Schema.Types.ObjectId,ref:'users'},
	hidden:{type:Boolean,default:false},
	approved:{type:Boolean,default:false},
	deleted:{type:Boolean,default:false},
	meta:{
		bookmarks:{type:Number,default:0},
		upvotes:{type:Number,default:0},
		favorites:{type:Number,default:0},
		edits:{type:Number,default:0},
		created_at:{type:Date,default:Date.now},
		updated_at:{type:Date,default:Date.now},
		deleted_at:Date,
		approved_at:Date,
		flagged:{type:Number,default:0}
	}
	

});
/*Update the updated field.*/ 
hacks.pre('save',function(next){
	var updated_at=new Date();
	this.meta.updated_at=updated_at;
	next();
});

/*Increment Upvote*/

hacks.methods.upvote=function(){
	this.meta.upvotes+=1;
}; 
var Hacks = mongoose.model('Hacks',hacks);
module.exports=Hacks;