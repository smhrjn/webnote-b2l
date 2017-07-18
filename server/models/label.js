const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
	name: {
		type: String,
		default: 'default'
	},
	color: {
		type: String,
		default: 'Orange'
	}
});

module.exports = mongoose.model('label', labelSchema);
