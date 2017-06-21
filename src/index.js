import './css/main.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/app';

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
