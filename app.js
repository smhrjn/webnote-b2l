const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://red-panda:webnotes2@ds133192.mlab.com:33192/webnotes');
mongoose.connection.on('error', (err) => console.log('connection error: ' + err));
mongoose.connection.once('open', () => console.log('connected to database'));

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

require('./server/router/app-routes.js')(app);

if (env === 'production') {
	app.use(express.static(path.join(__dirname, 'dist')));
	app.get('*', (req, res) => {
		// load the single view file ( will handle the page changes on the front-end)
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

if (env === 'development') {
	const logger = require('morgan');
	const config = require('./webpack.config');
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	// const webpackHotMiddleware = require('webpack-hot-middleware');
	const compiler = webpack(config);
	app.use(logger('dev'));
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	// app.use(webpackHotMiddleware);
	app.get('*', (req, res) => {
		// load the single view file ( will handle the page changes on the front-end)
		res.sendFile(path.join(__dirname, 'src/index.html'));
	});
}

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server running on port: ${ port }`);
	}
});
