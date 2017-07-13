import './css/variables.scss';
import './css/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/index-routes';
import formatDate from './js/format-date';

Vue.use(VueRouter);
Vue.filter('formatDate', formatDate);

import headerview from './views/Header.vue';
import footerview from './views/Footer.vue';

new Vue({
	el: '#app',

	router,

	components: { headerview, footerview },

	data() {
		return {

		};
	},

	mounted() {

	}
});
