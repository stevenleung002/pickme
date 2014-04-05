// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(req.params.eventName);

    var NumberOfEvents = data.events.length;
	var index = 0;
	for (var i=0;i<NumberOfEvents;i++)
	{
		if(data.events[i].eventName == req.params.eventName)
			break;
		index++;
	}

    var obj = data.events[i];

	res.render('hostoptions', obj);
};
