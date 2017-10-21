var User=require('../model/user');
var express=require('express');
var router=express.Router();

router.route('/users')
	.get(function(req,res){
		var response={};
		User.find({}).populate({path:'roles', select:'name'})
		.exec(function(err, data){
			if(err){
			response={"error ": true, "data" : "Error fetching data"};
		}else{data
			response={"error" : false, "data" : data};
		}
		res.json(response);
		})
	});

router.route("/user")
	.get(function(req,res){

	})
	.post(function(req,res){
		var user=new User(req.body);

		
		var response={};

		user.save(function(err,data){
			if(err){
				response={"error" : true, "data" : "Error adding data"};
			}else{
				response={"error" : false, "data" : data}
			}
		res.json(response)	
		})
		
		
			
	
})

router.route("/user/name/:name")
.get(function(req,res){
	var response={};
		User.find({username:req.params.name})
		.exec(function(err, data){
			if(err){
			response={"error ": true, "data" : "Error fetching data"};
		}else{data
			response={"error" : false, "data" : data};
		}
		res.json(response);
		})
	})

module.exports=router;