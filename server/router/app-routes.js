const User = require('../models/user');
const Note = require('../models/note');
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
		console.log('Sending users');
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
		let newuser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			labels: [{
				name: 'Default',
				color: '#F0B67F'
			}]
		});
		// create a todo, information comes from AJAX request from VUE
		newuser.save((err) => {
			if (err) {
				console.log('error: ' + err);
				return res.json({ error: 'Cannot Create User' });
			}
			const token = jwt.sign(newuser, pass.secret, { issuer: newuser.id.toString(), expiresIn: '1h' });
			res.json({
				message: 'user created!',
				userId: newuser._id,
				token: token
			});
			console.log('user created.');
		});
	});

	// return notes created by user
	app.get('/user/:id/notes', tokenCheck, (req, res) => {
		console.log('Populating Notes');
		User.findById(req.params.id, (err, userdata) => {
			if (err) {
				return res.json({ error: err });
			}
			if (!userdata) {
				console.log('user: ' + userdata);
				return res.json({ error: 'User not found.' });
			}
		}).
			populate('notelist', { _id: 1, title: 1, date: 1, body: 1, label: 1 }).
			exec((err, usrnotes) => {
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
		console.log('Getting Labels');
		User.findById(req.params.id, { _id: 0, labels: 1 }, (err, labels) => {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			// console.log('labels: ' + labels);
			res.json(labels);
		});
	});

	// create new note
	app.post('/user/:id/note', tokenCheck, (req, res) => {
		let newnote = new Note();
		newnote.title = req.body.title;
		newnote.body = req.body.body;
		newnote.label = req.body.label;
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

	// update labels
	app.put('/user/:id/labels', tokenCheck, (req, res) => {
		User.findOne({ _id: req.params.id }, (err, user) => {
			// console.log('got user: ' + user._id);
			if (err) {
				console.log(err);
				return res.json({ error: err });
			};
			if (!user) {
				res.json({
					error: 'User not found.'
				});
			};
			user.labels = req.body;
			// console.log('user labels: ' + user.labels);
			// console.log(req.body);
			user.save((err) => {
				if (err) {
					console.log('error: ' + err);
					return res.json({ error: err });
				}
				res.json({
					message: 'user labels updated!'
				});
				console.log('user labels Updated');
			});
		});
	});

	// update labels for Notes
	app.put('/user/:id/updatenotelabels', tokenCheck, (req, res) => {
		// console.log('Updating Labels in Notes');
		// console.log('Request Body: ' + JSON.stringify(req.body));
		User.findById(req.params.id, (err, userdata) => {
			if (err) {
				return res.json({ error: err });
			}
			if (!userdata) {
				// console.log('user: ' + userdata);
				return res.json({ error: 'User not found.' });
			}
		}).
			populate('notelist', { _id: 1 }).
			exec((err, usrnotes) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				// console.log('notes: ' + usrnotes.notelist);
				usrnotes.notelist.forEach((noteToChange) => {
					// console.log('iterating over notes: ' + noteToChange._id);
					Note.findById(noteToChange._id, (err, note) => {
						if (err) {
							console.log(err);
							return res.json({ error: err });
						};
						if (note.label.name === req.body.labelOld.name) {
							// console.log('changing label');
							note.label.name = req.body.labelNew.name;
							note.label.color = req.body.labelNew.color;
							console.log('new label: ' + note.label.color);
							note.save((err) => {
								if (err) {
									console.log(err);
									return res.json({ error: err });
								};
								// console.log('note saved');
							});
						}
					});
				});
				// console.log('notes updated');
				res.json({ message: 'label for notes updated' });
			});
	});

	// update labels for Notes
	app.put('/user/:id/updatenotelistlabels', tokenCheck, (req, res) => {
		// console.log('Updating Labels in Noteslist');
		// console.log('Request Body: ' + JSON.stringify(req.body));
		if (req.body.noteList.length) {
			req.body.noteList.forEach((noteToChange) => {
				// console.log('iterating over notes: ' + noteToChange._id);
				Note.findById(noteToChange._id, (err, note) => {
					if (err) {
						console.log(err);
						return res.json({ error: err });
					};
					// console.log('changing label');
					note.label.name = req.body.labelNew.name;
					note.label.color = req.body.labelNew.color;
					// console.log('new label: ' + note.label.name);
					note.save((err) => {
						if (err) {
							console.log(err);
							return res.json({ error: err });
						};
						// console.log('note saved');
					});
				});
			});
		}
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

	// update note details
	app.put('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findById(req.params.noteid,
			(err, note) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				note.title = req.body.title;
				note.body = req.body.body;
				note.label = req.body.label;
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
		Note.findByIdAndRemove(req.params.noteid,
			(err) => {
				if (err) {
					console.log(err);
					return res.json({ error: err });
				};
				res.json({
					message: 'note deleted'
				});
			});
	});
};
