const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	notelist: [{
		type: Schema.ObjectId,
		ref: 'note'
	}]
});

// userSchema.pre('save', function(next) {
// 	const user = this;
// 	console.log('Creating Hash');
// 	console.log(user.password);
// 	bcrypt.hash(user.password, 10, (err, hash) => {
// 		if (err) return next(err);
// 		user.password = hash;
// 		next();
// 	});
// });

userSchema.methods.validate = function(pw, next) {
	// bcrypt.compare(pw, this.password, (err, isMatch) => {
	// 	if (err) return next(err);
	// 	next(isMatch);
	// });
	if (pw === this.password) {
		next(true);
	} else {
		return next({ error: 'Passowrd does not match' });
	}
};

module.exports = mongoose.model('user', userSchema);
