import './css/variables.scss';
import './css/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';
import router from './router/index-routes';
import formatDate from './js/format-date';

Vue.use(VueRouter);
Vue.filter('formatDate', formatDate);

// import axios from 'axios';
// Vue.prototype.$http = axios.create({
// 	timeout: 5000
// });

import headerview from './views/Header.vue';
import footerview from './views/Footer.vue';
import navicon from './components/Nav-icon.vue';
import dropdown from './components/Dropdown.vue';

new Vue({
	el: '#app',

	router,

	store,

	components: { headerview, footerview, navicon, dropdown },

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

