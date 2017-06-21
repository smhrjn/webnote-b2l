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
	6. views
___
## _npm scripts_
* start development server `npm start`
	```javascript
	node app.js
	```
* create distribution bundle `npm build`
___
## _npm packages_

### Dependencies
* axios
* body-paarser
* express
* mongoose
* vue
* vue-router

### Development Dependencies
* babel-cli
* babel-core
* babel-loader
* babel-preset-es2015
* babel-register
* cross-env
* eslint-modules
	1. eslint
	1. eslint-config-google
	1. eslint-plugin-html
* morgan
* rimraf
* style-modules
	1. node-sass
	1. sass-loader
	1. style-loader
* vue-modules
	1. vue-loader
	1. vue-template-compiler
* webpack-modules
	1. webpack
	1. copy-webpack-plugin
	1. extract-text-webpack-plugin
	1. html-webpack-plugin
	1. webpack-dev-middleware
	1. webpack-dev-server
	1. webpack-md5-hash
___
## _To-do_
- [x] integrate webpack
- [x] test vue integration
- [x] ~~include mongodb local server~~
- [ ] improve mongoose schema
___
