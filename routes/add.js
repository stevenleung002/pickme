var data = require("../data.json");

exports.addFriend = function(req, res) {
	var newFriend = {
		"name": req.query.name,
		"description": req.query.description,
		"imageURL": "http://lorempixel.com/400/400/people"
	};
	console.log(newFriend);
	data["friends"].push(newFriend);
	res.render('add', data);
	// Your code goes here
}


exports.addPhoneNumber = function(req, res) {
	var newPhoneNumber = {
		"id" : "0",
		"number" : req.body.phoneNumber


	};
	console.log(newPhoneNumber);
	data["phoneNumbers"].push(newPhoneNumber);
	res.render('index', data);
}


exports.outputDatabase = function(req, res) {
	for(var i = 0; i < data["phoneNumbers"].length; i++) {
		console.log(data["phoneNumbers"][i]);
	}
	res.render('index', data);
}


