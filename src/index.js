import './css/variables.scss';
import './css/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';

import alertify from 'alertify.js';
Vue.prototype.alertify = alertify;

import store from './vuex/store';
import router from './router/index-routes';
import formatDate from './js/format-date';

Vue.use(VueRouter);
Vue.filter('formatDate', formatDate);

import headerview from './views/Header.vue';
import footerview from './views/Footer.vue';

new Vue({
	el: '#app',

	router,

	store,

	components: { headerview, footerview },

	data() {
		return {
			showNav: false,
		};
	},
	computed: {
		userName() {
			return store.state.userName;
		},
		userId() {
			return store.state.userId;
		},
		token() {
			return store.state.token;
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

