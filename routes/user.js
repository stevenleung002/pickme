var data = require("../data.json");

exports.view = function(req, res) {

	console.log(data);
	res.render('user', data.events[0]);
	// Your code goes here
}
exports.add = function(req, res) {

	var newPhoneNumber = {
		"phone" : req.body.phoneNumber
	};

	console.log(newPhoneNumber);
	data["events"][0]["members"].push(newPhoneNumber);
	res.render('user', data);
}