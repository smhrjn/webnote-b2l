const User = require('../models/user');
const Note = require('../models/note');

module.exports = (app) => {
	/*
	// api ---------------------------------------------------------------------
	users/*. Collection of Users (internal)
	API:
	POST USERS/ID + pw - > USER Exists? if !err return WEB UI + List of saved notes
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
	app.get('/user/:id/notes', (req, res) => {
		User.findById(req.params.id).
		populate('notelist', { _id: 1, title: 1}).
		exec((err, usrnotes) => {
			if (err) return res.send('Error' + err);
    		res.json(usrnotes.notelist);
		});
  	});
	
    //create new note
	app.post('/user/:id/note', (req, res) => {
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
	app.get('/user/:id/:noteid', (req, res) => {
		Note.findById(req.params.noteid, (err, note) => {
			if (err) return res.send('Error' + err);
			res.json(note);
		});
	});
	//update note details
	app.put('/user/:id/:noteid', (req, res) => {
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
	app.delete('/user/:id/:noteid', (req, res) => {
		Note.findByIdAndRemove(req.params.noteid,
			(err) => {
				if (err) return res.send(err);
            	res.json({
				message: 'note deleted'
				});
			});
	});		
	
};
