const User = require('../models/user');
const Note = require('../models/note');
const Label = require('../models/label');
const tokenCheck = require('../middleware/token-check.js');
const pass = require('../../config/config.js');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
	/*
		// api ---------------------------------------------------------------------
		users/*. Collection of Users (internal)
		API:
		POST /login + pw - > USER Exists? if !err return Json Web Token , WEB UI + List of saved notes
			POST USERS/New -> create new user (bcrypt hash password) ====> ok
			PUT /login + old PW + new PW => Update Password
			DELETE /user/:id  + PW = > Delete account

		notes: users/:id/notes.
		API:
		GET user/:id/notes/-> list of user's saved notes id and title ==> ok
		POST user/:id/note- > create/save new note ==> ok
		GET user/:id/:noteid -> read saved note details
		PUT user/:id/:noteid -> updates saved note
		DELETE user/:id/:noteid -> deteles saved note
		A resource representing user settings: user/:id/settings.
	*/

	// user login
	app.post('/login', (req, res) => {
		User.findOne({ name: req.body.name }, (err, user) => {
			if (err) return res.send('Error' + err);
			if (!user) {
				res.json({
					error: 'User not found'
				});
			} else if (user) {
				user.comparePw(req.body.password, (err, isMatch) => {
					if (err) return res.send('Error' + err);

					if (!isMatch) res.json({ error: 'Wrong password.' });

					else {
						// const token = jwt.sign(user, pass.secret, { issuer: user.id.toString(), expiresIn: 120 });
						const token = jwt.sign(user, pass.secret, { issuer: user.id.toString(), expiresIn: '1h' });
						// console.log('sending login response');
						res.json({
							message: 'Signed In.',
							userId: user._id,
							token: token
						});
					}
				});
			}
		});
	});

	// password update API
	app.put('/login', tokenCheck, (req, res) => {
		User.findOne({ name: req.body.name }, (err, user) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			if (!user) {
				res.json({
					error: 'User not found'
				});
			} else if (user) {
				user.comparePw(req.body.oldpassword, (err, isMatch) => {
					if (err) return res.status(400).send( { error: 'missing data' });

					if (!isMatch) res.json({ error: 'Wrong password.' });

					else {
						user.password = req.body.newpassword;
						user.save((err) => {
							if (err) {
								console.log('error: ' + err);
								return res.json({ error: err });
							}
							res.json({
								message: 'password updated.'
							});
							console.log('password changed.');
						});
					}
				});
			}
		});
	});

	// delete user
	app.delete('/user/:id', tokenCheck, (req, res) => {
		User.findByIdAndRemove(req.params.id,
			(err) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				res.json({
					message: 'user deleted'
				});
			});
	});

	// get list of users
	app.get('/users', tokenCheck, (req, res) => {
		// console.log('Sending users');
		User.find(req.params.id, (err, usrdata) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			res.json(usrdata);
		});
	});

	// create user
	app.post('/user/new', (req, res) => {
		let defaultLabel = new Label();
		defaultLabel.save((err) => {
			if (err) {
				console.log('error: ' + err);
				return res.json({ error: 'Problem creating default Label' });
			}
		});
		let newuser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			labels: [defaultLabel._id]
		});
		// create a todo, information comes from AJAX request from VUE
		newuser.save((err) => {
			if (err) {
				console.log('error: ' + err);
				return res.json({ error: 'Cannot Create User' });
			}
			// const token = jwt.sign(newuser, pass.secret, { issuer: newuser.id.toString(), expiresIn: '1h' });
			res.json({
				message: 'user created!',
				userId: newuser._id
				// token: token
			});
			console.log('user created.');
		});
	});

	// return notes created by user
	app.get('/user/:id/notes', tokenCheck, (req, res) => {
		// console.log('Populating Notes');
		User.findById(req.params.id, (err, userdata) => {
			if (err) {
				return res.json({ error: err });
			}
			if (!userdata) {
				// console.log('user: ' + userdata);
				return res.json({ error: 'User not found.' });
			}
		})
			.populate('notelist', { _id: 1, title: 1, date: 1, body: 1, labelId: 1 })
			.exec((err, usrnotes) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				// console.log('notes: ' + usrnotes.notelist);
				res.json(usrnotes.notelist);
			});
	});

	// return labels created by user
	app.get('/user/:id/labels', tokenCheck, (req, res) => {
		// console.log('Populating Labels');
		User.findById(req.params.id, (err, userdata) => {
			if (err) {
				return res.json({ error: err });
			}
			if (!userdata) {
				// console.log('user: ' + userdata);
				return res.json({ error: 'User not found.' });
			}
		})
			.populate('labels', { _id: 1, name: 1, color: 1 })
			.exec((err, userlabels) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				// console.log('notes: ' + usrnotes.notelist);
				res.json(userlabels.labels);
			});
	});

	// create new label
	app.post('/user/:id/label', tokenCheck, (req, res) => {
		let label = new Label();
		// console.log('req to create label:' + req.body.name);
		label.name = req.body.name;
		label.color = req.body.color;
		label.save((err) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
		});
		User.findOneAndUpdate({
			_id: req.params.id
		}, {
			$push: {
				labels: label._id
			}
		},
		(err) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			res.json({
				message: 'label created',
				_id: label._id
			});
		});
		console.log('New label created.');
	});

	// create new note
	app.post('/user/:id/note', tokenCheck, (req, res) => {
		let newnote = new Note();
		newnote.title = req.body.title;
		newnote.body = req.body.body;
		newnote.labelId = req.body.labelId;
		newnote.save((err) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
		});
		User.findOneAndUpdate({
			_id: req.params.id
		}, {
			$push: {
				notelist: newnote._id
			}
		},
		(err) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			res.json({
				message: 'note created',
				_id: newnote._id,
				date: newnote.date
			});
		});
		console.log('New note created.');
	});

	// get note details
	app.get('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findById(req.params.noteid, (err, note) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			res.json(note);
		});
	});

	// update label details
	app.put('/label/:id/:labelid', tokenCheck, (req, res) => {
		Label.findById(req.params.labelid,
			(err, label) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				label.name = req.body.name;
				label.color = req.body.color;
				label.save((err) => {
					if (err) {
						console.log(err);
						return res.json({ error: err });
					};
				});
				res.json({
					message: 'label updated'
				});
			});
	});

	// update note details
	app.put('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findById(req.params.noteid, (err, note) => {
			// console.log('updating note');
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			note.title = req.body.title;
			note.body = req.body.body;
			note.labelId = req.body.labelId;
			// console.log('labelIds: ' + note.labelId + ' and ' + req.body.labelId);
			note.save((err) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
			});
			res.json({
				message: 'note updated'
			});
		});
	});

	// remove note
	app.delete('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findByIdAndRemove(req.params.noteid, (err) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			res.json({
				message: 'note deleted'
			});
		});
	});

	// remove label
	app.delete('/label/:id/:labelid/:defaultid', tokenCheck, (req, res) => {
		Note.find({ labelId: req.params.labelid }, (err, notes) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			if (notes.length) {
				notes.forEach((note) => {
					note.labelId = req.params.defaultid;
					note.save((err) => {
						if (err) {
							console.log(err);
							return res.json({ error: err });
						};
					});
				});
			}
		});
		Label.findByIdAndRemove(req.params.labelid,
			(err) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				res.json({
					message: 'label deleted'
				});
			});
	});
};
