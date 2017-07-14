import './css/variables.scss';
import './css/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import store from './vuex/store';
import router from './router/index-routes';
import formatDate from './js/format-date';

Vue.use(VueRouter);
Vue.filter('formatDate', formatDate);
// Vue.prototype.$http = axios.create({
// 	timeout: 5000
// });

import headerview from './views/Header.vue';
import footerview from './views/Footer.vue';
import navicon from './components/Nav-icon.vue';

new Vue({
	el: '#app',

	router,

	store,

	components: { headerview, footerview, navicon },

	data() {
		return {
			showNav: false,
		};
	},
	computed: {
		userId() {
			return window.localStorage.getItem('userId');
		},
		token() {
			return window.localStorage.getItem('token');
		}
	},
	methods: {
		toggleNav() {
			this.showNav = !this.showNav;
		}
	},
	mounted() {

	}
});

