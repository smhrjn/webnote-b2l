# webnote-b2l [live app](https://web-notes.herokuapp.com)
## _**Build to Learn Project**_ (Chingu-FreeCodeCamp)
___
### Contributors:
* @smhrjn
* @leovcunha
___
## _Folder Structure_
* buildScripts
    >javascript to create distribution bundle
* config
    >configuration for server and database
* dist
    >webpack generated distribution folder
* server
	1. models
	2. router
* src
	1. api
	2. components
	3. css
	4. router
	5. vendor
        >bundle vendor modules in separate bundle

	6. views
___
## _npm scripts_
* start development server `npm start`
	```javascript
	node app.js // runs app in development mode
	```
* create distribution bundle `npm build`
___
## _npm packages_

### Dependencies
* axios
    >promise baset HTTP client for browser and node
* body-paarser
    >parse incoming request bodies in a middleware before your handlers, available under the req.body property
* express
    >fast, unopinionated, minimalist web framework for node
* mongoose
    >a MongoDB object modeling tool designed to work in an asynchronous environment
* vue
    >a progressive, incrementally-adoptable JavaScript framework for building UI on the web
* vue-router
    >official router for Vue.js

### Development Dependencies
* babel-cli
    >cli for Babel, a compiler for writing next generation JavaScript
* babel-core
    >javascript compiler
* babel-loader
    >webpack plugin for Babel
* babel-preset-es2015
    >Babel presets for all es2015 plugins
* babel-register
    >use Babel through the require hook. The require hook will bind itself to node's require and automatically compile files on the fly.
* cross-env
    >run scripts that set and use environment variables across platforms

* eslint-modules
	1. eslint
        >fully pluggable tool for identifying and reporting on patterns in JavaScript

	1. eslint-config-google
        >shareable config for the Google JavaScript style guide

	1. eslint-plugin-html
        >extract and lint scripts from HTML files

* morgan
    >HTTP request logger middleware
* rimraf
    >`rm -rf` util for nodejs
* style-modules
	1. node-sass
        >allows to natively compile .scss files to css at incredible speed and automatically via a connect middleware

	1. sass-loader
        >compile SASS to CSS

	1. style-loader
        >inject CSS to DOM by injecting style tag

* vue-modules
	1. vue-loader
        >Vue.js components loader

	1. vue-template-compiler
        >pre-compile Vue 2.0 templates into render functions to avoid runtime-compilation overhead and CSP restrictions

* webpack-modules
	1. webpack
        >modules bundler

	1. copy-webpack-plugin
        >copy files and directories

	1. extract-text-webpack-plugin
        >extract text from bundle to a file

	1. html-webpack-plugin
        >simplifies creation of HTML files to serve your webpack bundles

	1. webpack-dev-middleware
        >dev middleware for webpack, which arguments a live bundle to a directory

	1. webpack-dev-server
        >serves a webpack app. Updates the browser on changes

	1. webpack-md5-hash
        >replace a standard webpack chunkhash with md5
___
## _To-do_
- [x] integrate webpack
- [x] test vue integration
- [x] ~~include mongodb local server~~
- [ ] improve mongoose schema
___
