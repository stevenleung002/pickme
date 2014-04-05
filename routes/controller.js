// Get all of our friend data
var data = require('../data.json');

exports.createEvent = function(req, res) {
	var eventObj = {
		"eventName": req.body.eventName,
		"eventPassword": req.body.eventPassword,
		"members": []		
	};

	data.events.push(eventObj);

	//create the event to the database, add the password as well
	eventObj.guestUrl = "http://localhost:3000/"+eventObj.eventName;
	eventObj.hostUrl = "http://localhost:3000/manage/"+eventObj.eventName;

	res.render('confirmation', eventObj);

}
exports.guest = function(req, res) {
	var obj = {eventName : req.params.eventName};
	//check if the eventName is already there.

	res.render('guest', obj);
}
exports.host = function(req, res) {

}


exports.enterRaffle = function(req, res){

	var number = req.body.phoneNumber;
	var eventName = req.body.eventName;

	//loop through the array
	console.log(number);
	console.log(eventName);


	res.render('complete');
}
exports.checkIfPhoneExist = function(req, res){

	res.json(200,{status: "success"});
}