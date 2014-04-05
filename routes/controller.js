// Get all of our friend data
var data = require('../data.json');

exports.createEvent = function(req, res) {
	var eventObj = {
		"eventName": req.body.eventName,
		"eventPassword": req.body.eventPassword,
		"members": [],
		"winners": []		
	};

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

		  data.events.push(eventObj);
		  res.render('hostoptions', eventObj);
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

	for (var i=0;i<data.events.length;i++)
	{
		if(data.events[i].eventName == eventName)
			break;
	}
    data["events"][i]["members"].push(num);
	res.render('complete', num);
}

exports.generateWinner = function(req, res){
	var obj= {eventName : req.params.eventName}; 
	var Name = obj.eventName;
	//generate a winner

	for (var i=0;i<data.events.length;i++)
	{
		console.log("Compare  "+ Name + " with "+data.events[i].eventName);
		if(data.events[i].eventName == Name)
			break;
	}
	var temp = data.events[i].members.length;
	console.log("temp : " + temp + ", len : " + data.events[i].members.length);
	if(temp > 0 ){
		var randomnumber = Math.floor((Math.random()*temp));
		console.log("random number "+ randomnumber);

		//move the select element from the pool to the winners list
		var phoneNum = data.events[i].members[randomnumber].phone;
		data.events[i].winners.push(data.events[i].members[randomnumber]);//add it to the winner
		data.events[i].members.splice(randomnumber, 1);//remove it from the array

		res.json(200,
				{
					status: "success",
					phone: phoneNum
				});		
	}

	else {
		res.json(200,{status:"fail",
					  msg: "No more winners!"});
	}	
}


exports.resetWinner = function(req,res){
	var obj= {eventName : req.params.eventName}; 	
	var Name = obj.eventName;
	//generate a winner

	for (var i=0;i<data.events.length;i++)
	{
		console.log("Compare  "+ Name + " with "+data.events[i].eventName);
		if(data.events[i].eventName == Name)
			break;
	}
	data.events[i].members = data.events[i].members.concat(data.events[i].winners);
	data.events[i].winners = [];

	res.json(200, {status: "success"});
}