var express = require("express");
var bodyParser = require("body-parser");
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

require('./routes/mainroutes.js')(app);

app.get('*', function(req, res) {
        res.sendfile('./index.html'); // load the single view file ( will handle the page changes on the front-end)
});

var server = app.listen(process.env.PORT || 8080);


