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

 	var num = {
 		"phone": number
 	}
   var NumberOfEvents = data.events.length;
	var index = 0;
	for (var i=0;i<NumberOfEvents;i++)
	{
		if(data.events[i].eventName == eventName)
			break;
		index++;
	}
    data["events"][index]["members"].push(num);
	res.render('complete', num);
}
exports.checkIfPhoneExist = function(req, res){

	res.json(200,{status: "success"});
}

exports.generateWinner = function(req, res){
	var obj = {eventName : req.params.eventName};
	var Name = obj.eventName;
	//generate a winner

	var NumberOfEvents = data.events.length;
	console.log("Number of events = "+ NumberOfEvents);

	var index = 0;
	for (var i=0;i<NumberOfEvents;i++)
	{
		console.log("Compare  "+ Name + " with "+data.events[i].eventName);
		if(data.events[i].eventName == Name)
			break;
		index++;
	}
	console.log("index =" +index);
	var temp = data.events[index].members.length;
	var randomnumber = Math.floor((Math.random()*temp)+1);
	console.log("random number "+ randomnumber);
	res.json(200,{size:data.events[index].members[randomnumber].phone});
}