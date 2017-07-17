const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: String,
	body: String,
	date: {
		type: Date,
		default: Date.now
	},
	label: {
		type: String
	}
});

module.exports = mongoose.model('note', noteSchema);
