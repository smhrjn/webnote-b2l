const colors = require('../../src/js/colors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
	name: {
		type: String,
		default: 'default'
	},
	color: {
		type: String,
		default: colors[0].hex
	}
});

module.exports = mongoose.model('label', labelSchema);
