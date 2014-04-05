// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	for (var i=0;i< data.events.length;i++)
	{
		if(data.events[i].eventName == req.params.eventName)
			break;
	}
	//console.log(data);
	res.render('share', data.events[i]);
};