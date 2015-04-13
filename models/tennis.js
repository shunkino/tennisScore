var mongo = require('mongoose');
mongo.connect('mongodb://localhost/tennisScorer');

var schema = mongo.Schema;
var Tennis = mongo.model('tennis', new schema({
	ID: String,
	Password: String,
	createdAt: {type: Date, default: Date.now}
	})
);

module.exports = Tennis;
