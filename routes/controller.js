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
	eventObj.guestUrl = "http://eggme.herokuapp.com/"+eventObj.eventName;
	eventObj.hostUrl = "http://eggme.herokuapp.com/manage/"+eventObj.eventName;
	res.json(200,eventObj);
}
exports.guest = function(req, res) {

}
exports.host = function(req, res) {

}

exports.checkIfPhoneExist = function(req, res){

	res.json(200,{status: "success"});
}