const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
	name: {
		type: String,
	},
	color: {
		type: String,
	}
});

module.exports = labelSchema;
