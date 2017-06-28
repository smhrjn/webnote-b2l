import 'normalize.css/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.css';
import './css/main.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/index-routes';

Vue.use(VueRouter);

import headerview from './views/Header.vue';
import footerview from './views/Footer.vue';

new Vue({
	el: '#app',

	router,

	components: {headerview, footerview},

	data() {
		return {

		};
	},

	mounted() {

	}
});
