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
	POST /login + pw - > USER Exists? if !err return WEB UI + List of saved notes
	POST USERS/New -> cria novo usuario (json web tokens) ====> ok

	notes: users/:id/notes.
	API:
	GET user/:id/notes/-> list of user's saved notes id and title ==> ok
	POST user/:id/note- > create/save new note ==> ok
	GET user/:id/:noteid -> read saved note details
	PUT user/:id/:noteid -> updates saved note
	DELETE user/:id/:noteid -> deteles saved note
	A resource representing user settings: user/:id/settings.
	*/
	app.post('/login', (req, res) => {
		User.findOne({ name: req.body.name }, (err, user) => {
			if (err) return res.send('Error' + err);
			
			if (!user) {
				res.json({
					sucess: false,
					message: 'User not found'
				});
			} else if (user) {
				
				user.validate(req.body.password, (isMatch) => {
					if (!isMatch) res.json({ success: false, message: 'Wrong password.' });
					
					else {
						const token = jwt.sign(user, pass.secret, { issuer: (user.id).toString(), expiresIn: '1h'});
						res.json({
							success: true,
							message: 'token created',
							userId: user._id,
							token: token
						})
					}
				});
			}
		});
	});

	app.get('/users', (req, res) => {
		console.log('Sending users');
		User.find(req.params.id, (err, usrdata) => {
			if (err) return res.send('Error' + err);
			res.json(usrdata);
		});
	});

	// create user 
	app.post('/user/new', (req, res) => {
		let newuser = new User();
		newuser.name = req.body.name;
		newuser.email = req.body.email;
		newuser.password = req.body.password;
		console.log('creating user' + newuser);
		// create a todo, information comes from AJAX request from VUE
		newuser.save((err) => {
			console.log('inside save');
			if (err) {
				console.log('error:' + err);
				return res.send(err);
			}
			res.json({
				message: 'user created!'
			});
			console.log('success');
		});
	});

	// return id and title of notes created by user 
	app.get('/user/:id/notes', tokenCheck, (req, res) => {
		User.findById(req.params.id).
		populate('notelist', { _id: 1, title: 1}).
		exec((err, usrnotes) => {
			if (err) return res.send('Error' + err);
    		res.json(usrnotes.notelist);
		});
  	});
	
    //create new note
	app.post('/user/:id/note', tokenCheck, (req, res) => {
		let newnote = new Note();
		
		newnote.title = req.body.title;
		newnote.body = req.body.body;
		// create a note, information comes from AJAX request
		newnote.save((err) => {
			if (err) return res.send(err);
		});
		User.findOneAndUpdate({_id: req.params.id}, {$push: {notelist: newnote._id}},
			(err) => {
				if (err) return res.send(err);
				res.json({
				message: 'note created'
				});
			}
		);
		console.log('success');
	
	});
	//get note detais
	app.get('/user/:id/:noteid', tokenCheck, (req, res) => {
		Note.findById(req.params.noteid, (err, note) => {
			if (err) return res.send('Error' + err);
			res.json(note);
		});
	});
	//update note details
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
	
	//remove note details
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
