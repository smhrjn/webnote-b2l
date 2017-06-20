const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const logger = morgan('tiny');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://smhrjn:abc123@ds131492.mlab.com:31492/notes');
mongoose.connection.on('error', (err) => console.log('connection error: ' + err));
mongoose.connection.once('open', () => console.log('connected to database'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use(logger);

require('./routes/mainroutes.js')(app);

app.get('*', (req, res) => {
	// load the single view file ( will handle the page changes on the front-end)
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8080, (err) => {
	if (err) return console.log('error occured: ' + err);
	console.log('listening on port 8080');
});
