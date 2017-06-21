const User = require('../models/user');
const Note = require('../models/note');

module.exports = (app) => {
	/*
	// api ---------------------------------------------------------------------
	users/*. Collection of Users (internal)
	API:
	POST USERS/ID + senha - > USER Exists? if !err return WEB UI + List of saved notes
	POST USERS/New -> cria novo usuario (oauth Facebook) ====> ok
	notes: users/n/notes/n.
	notes stylesheet: users/n/notes/id/style
	API:
	GET users/n/notes/-> list of saved notes
	POST users/n/notes- > create/save new note
	PUT users/n/notes:id -> updates saved note
	DELETE users/n/notes:id -> deteles saved note
	A resource representing the user profile: users/n/profile.
	A resource representing user settings: users/n/settings.
	*/

	// // POST USERS/ID + senha - > USER Exists? if !err return WEB UI + List of saved notes
	// app.get('/user/:id', (req, res) => {
	// 	console.log('Sending user id');
	// 	User.findById(req.params.id, (err, usrdata) => {
	// 		if (err) return res.send('Error' + err);
	// 		res.json(usrdata);
	// 	});
	// });

	app.get('/users', (req, res) => {
		console.log('Sending users');
		User.find(req.params.id, (err, usrdata) => {
			if (err) return res.send('Error' + err);
			res.json(usrdata);
		});
	});

	// create todo and send back all todos after creation
	app.post('/user/new', (req, res) => {
		let newuser = new User();
		newuser.name = req.body.name;
		newuser.email = req.body.email;
		console.log('creating user' + newuser);
		// create a todo, information comes from AJAX request from Angular
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

	// alter to return only title and id
	app.get('/user/:id/notes', (req, res) => {
		Note.find({
			user: req.params.id
		}, (err, usrnotes) => {
			if (err) return res.send(err);
			res.json(usrnotes);
		});
	});

	app.post('/user/:id/note', (req, res) => {
		let newnote = new Note();
		newnote.title = req.body.title;
		newnote.body = req.body.body;
		newnote.user = req.params.id;
		// create a todo, information comes from AJAX request from Angular
		newnote.save((err) => {
			if (err) return res.send(err);
			res.json({
				message: 'note created!'
			});
			console.log('success');
		});
	});
};
