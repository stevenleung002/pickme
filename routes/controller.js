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

	var Bitly = require('bitly');
	var bitly = new Bitly('o_5sfjrl9qot', 'R_66a5ac49dd544c928c143b4fa2179219');

	var user_url;
	var host_url;


	bitly.shorten('https://github.com/tanepiper/node-bitly', function(err, response) {
	  if (err) throw err;

	  // See http://code.google.com/p/bitly-api/wiki/ApiDocumentation for format of returned object
	  user_url = response.data.url;;
	  // Do something with data

		bitly.shorten('http://www.harrynetwork.com', function(err, response) {
		  if (err) throw err;

		  // See http://code.google.com/p/bitly-api/wiki/ApiDocumentation for format of returned object
		  host_url = response.data.url;
	  	  console.log(user_url)
		  console.log(host_url);
		  // Do something with data

		  eventObj.user_url = user_url;
		  eventObj.host_url = host_url;

		  res.render('confirmation', eventObj);
		});

	});





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

	res.render('complete', num);
}
exports.checkIfPhoneExist = function(req, res){

	res.json(200,{status: "success"});
}

exports.generateWinner = function(req, res){

	//generate a winner
	
	var size = data.events[0].members.length;
	var randomnumber = Math.floor((Math.random()*size)+1);
	console.log("I am here"+ data.events[0].members[randomnumber].phone);
	res.json(200,{size:data.events[0].members[randomnumber].phone});
}