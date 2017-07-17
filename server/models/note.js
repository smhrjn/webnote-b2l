const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = require('./schema/label');

const noteSchema = new Schema({
	title: String,
	body: String,
	date: {
		type: Date,
		default: Date.now
	},
	label: {
		type: labelSchema,
		required: true
	}
});

module.exports = mongoose.model('note', noteSchema);
