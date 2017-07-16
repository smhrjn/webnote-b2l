const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	{bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
	}
});

userSchema.methods.comparePw = function(pw, next) {
	bcrypt.compare(pw, this.password, (err, isMatch) => {
		if (err) {
			return next(err, false);
		}
		return next(null, isMatch);
	});
};

module.exports = mongoose.model('user', userSchema);
