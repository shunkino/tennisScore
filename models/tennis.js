var mongo = require('mongoose');
mongo.connect('mongodb://localhost/tennisScorer');

var schema = mongo.Schema;
var Tennis = mongo.model('tennis', new schema({
	isDoubles: Boolean,
	maxSet: Number,
	ScoreSideA: { type: Number, default: 0},
	ScoreSideB: { type: Number, default: 0},
	player1: {type: String, require: true},
	player2: {type: String, require: true},
	player1_2: {type: String},
	player2_2: {type: String},
	ID: { type: String, require: true,  unique: true },
	Password: { type: String, require: true },
	createdAt: { type: Date, default: Date.now }
	})
);

module.exports = Tennis;
