var Todo=require('../model/todo');
var express=require('express');
var router=express.Router();

router.route('/todos/user/:user')
	.get(function(req,res){
		var response={};
		Todo.find({user:req.params.user}, function(err,data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "data": "Error fetching data "};
			}else{
				response={"error": false, "data" : data};
			}
			console.log(response)
			res.json(response);
		});
	});

router.route("/todo")
	.get(function(req,res){
		res.json(new Todo());
	})
	.post(function(req,res){
		var todo=new Todo(req.body);
		var response={};

		todo.save(function(err,data){
			if(err){
				response={"error" : true, "data" : err};
			}else{
				response={"error" : false, "data": data};
			}
			console.log(response)
			res.json(response)
		})
	})

router.route("/todo/id/:id")
	.get(function(req,res){
		var response={};
		Todo.findById(req.params.id,function(err,data){
			if(err){
				response={"error ": true, "data" : "Error fetching data"};
			}else{data
				response={"error" : false, "data" : data};
			}
			res.json(response);
		});
	})
	.put(function(req,res){
		var response={};
		//find the data
		Todo.findById(req.params.id,function(err,data){
			if(err){
				response={"error": true, "data" : "Error fetching data"};
			}else{
				//data exists
				if(req.body.done!==undefined){
					data.done=req.body.done;
				}
				//save the data
				data.save(function(err){
					if(err){
						response={"error" : false, "data" : "Data is updated for " + req.params.id};
					}
					res.json(response);
				})
			}
		})
	})
	

module.exports=router;