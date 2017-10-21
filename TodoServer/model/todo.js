var mongoose=require("mongoose");


var todoSchema=new mongoose.Schema({

	text: String,
	done:Boolean,
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
})

module.exports=mongoose.model('todo', todoSchema);
