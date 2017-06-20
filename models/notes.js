const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: String,
	body: String,
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('notes', noteSchema);
