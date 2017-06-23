import 'normalize.css/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.css';
import './css/main.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/index-routes';

Vue.use(VueRouter);

new Vue({
	el: '#app',

	router,

	data() {
		return {

		};
	},

	mounted() {

	}
});
