const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
	name: {
		type: String,
		default: 'Default'
	},
	color: {
		type: String,
		default: '#F0B67F'
	}
});

module.exports = mongoose.model('label', labelSchema);
