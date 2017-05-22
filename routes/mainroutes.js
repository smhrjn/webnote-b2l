var user = require ('../models/user');
var notes = require('../models/notes');


module.exports = function(app)  {
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

// POST USERS/ID + senha - > USER Exists? if !err return WEB UI + List of saved notes
    app.get('/user/:id', function (req, res) {
         user.findById(req.params.id, function(err, usrdata) {
            if (err)
                return res.send(err);
            res.json(usrdata);
        });
    });

    // create todo and send back all todos after creation
    app.post('/user/new', function (req, res) {
        
        var newuser = new user();
        newuser.name = req.body.name;
        newuser.email = req.body.email;
        // create a todo, information comes from AJAX request from Angular
        newuser.save(function (err) {
            if (err)
               return res.send(err);
            res.json({ message: 'user created!' });
            console.log("success")

        });
        
    

    });
    // alter to return only title and id
    app.get('/user/:id/notes', function (req, res) {
         notes.find({user: req.params.id}, function(err, usrnotes) {
            if (err)
                return res.send(err);
            res.json(usrnotes);
        });
    });    

    app.post('/user/:id/notes', function (req, res) {
        
        var newnote = new notes();
        newnote.title = req.body.title;
        newnote.body = req.body.body;
        newnote.user = req.params.id;
        // create a todo, information comes from AJAX request from Angular
        newnote.save(function (err) {
            if (err)
               return res.send(err);
            res.json({ message: 'note created!' });
            console.log("success")

        });
        
    

    });

}