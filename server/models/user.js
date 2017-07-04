const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: String,
	notelist: [{ type: Schema.ObjectId, ref: 'note' }]

});

module.exports = mongoose.model('user', userSchema);
