var mongo = require('mongoose');
mongo.connect('mongodb://localhost/tennisScorer');

var schema = mongo.Schema;
var Tennis = mongo.model('tennis', new schema({
	id: String,
	pass: String,
	createdAt: {type: Date, default: Date.now}
	})
);

module.exports = Tennis;
