// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(req.params.eventName);
    var obj = {eventName : req.params.eventName};
	res.render('hostoptions', obj);
};