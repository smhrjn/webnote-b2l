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
					sucess: false,
					message: 'User not found'
				});
			} else if (user) {
				user.comparePw(req.body.password, (err, isMatch) => {
					if (err) return res.send('Error' + err);

					if (!isMatch) res.json({ success: false, message: 'Wrong password.' });

					else {
						const token = jwt.sign(user, pass.secret, { issuer: user.id.toString(), expiresIn: '1h' });
						res.json({
							success: true,
							message: 'token created',
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
			if (err) return res.send('Error' + err);
			if (!user) {
				res.json({
					sucess: false,
					message: 'User not found'
				});
			} else if (user) {
				user.comparePw(req.body.oldpassword, (err, isMatch) => {
					if (err) return res.status(400).send('Error: missing data');

					if (!isMatch) res.json({ success: false, message: 'Wrong password.' });

					else {
						user.password = req.body.newpassword;
						user.save((err) => {
							console.log('inside save');
							if (err) {
								console.log('error: ' + err);
								return res.json({ error: 'Cannot update password' });
							}
							res.json({
								success: true,
								message: 'password updated!'
							});
							console.log('success');
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
				if (err) return res.send(err);
				res.json({
					message: 'user deleted'
				});
			});
	});

	// get list of users
	app.get('/users', tokenCheck, (req, res) => {
		console.log('Sending users');
		User.find(req.params.id, (err, usrdata) => {
			if (err) return res.send('Error' + err);
			res.json(usrdata);
		});
	});

	// create user
	app.post('/user/new', (req, res) => {
		let newuser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		console.log('creating user' + newuser);
		// create a todo, information comes from AJAX request from VUE
		newuser.save((err) => {
			console.log('inside save');
			if (err) {
				console.log('error: ' + err);
				return res.json({ error: 'Cannot Create User' });
			}
			res.json({
				message: 'user created!'
			});
			console.log('success');
		});
	});

	// return id and notes created by user
	app.get('/user/:id/notes', tokenCheck, (req, res) => {
		User.findById(req.params.id).
			populate('notelist', { _id: 1, title: 1, date: 1, body: 1 }).
			exec((err, usrnotes) => {
				if (err) return res.send('Error' + err);
				res.json(usrnotes.notelist);
			});
	});

	// create new note
	app.post('/user/:id/note', tokenCheck, (req, res) => {
		let newnote = new Note();
		newnote.title = req.body.title;
		newnote.body = req.body.body;
		newnote.save((err) => {
			if (err) return res.send(err);
		});
		User.findOneAndUpdate({
			_id: req.params.id
		}, {
			$push: {
				notelist: newnote._id
			}
		},
		(err) => {
			if (err) return res.send(err);
			res.json({
				message: 'note created',
				_id: newnote._id,
				date: newnote.date
			});
		});
		console.log('success');
	});

	// get note details
	app.get('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findById(req.params.noteid, (err, note) => {
			if (err) return res.send('Error' + err);
			res.json(note);
		});
	});

	// update note details
	app.put('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findById(req.params.noteid,
			(err, note) => {
				if (err) return res.send(err);
				note.title = req.body.title;
				note.body = req.body.body;
				note.save((err) => {
					if (err) return res.send(err);
				});
				res.json({
					message: 'note updated'
				});
			});
	});

	// remove note details
	app.delete('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findByIdAndRemove(req.params.noteid,
			(err) => {
				if (err) return res.send(err);
				res.json({
					message: 'note deleted'
				});
			});
	});
};
