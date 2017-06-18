const express = require("express");
const bodyParser = require("body-parser");
const mongoose   = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://smhrjn:abc123@ds131492.mlab.com:31492/notes');
// mongoose.connect('mongodb://localhost:27017/notes');
mongoose.connection.on('error', (err) => console.log('connection error: ' + err));
mongoose.connection.once('open', () => console.log('connected to database'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));

require('./routes/mainroutes.js')(app);

app.get('*', function(req, res) {
	// load the single view file ( will handle the page changes on the front-end)
	res.sendfile('./index.html');
});

var server = app.listen(process.env.PORT || 8080, (err) => {
	if(err) return console.log('error occured: ' + error);
	console.log('listening on port 8080');
});
