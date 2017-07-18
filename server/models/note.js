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
		type: Schema.ObjectId,
		ref: 'label'
	}
});

module.exports = mongoose.model('note', noteSchema);
