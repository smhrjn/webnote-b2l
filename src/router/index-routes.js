import VueRouter from 'vue-router';
import App from '../views/App.vue';
import Navigation from '../views/Navigation.vue';
import Footer from '../views/Footer.vue';
import About from '../views/About.vue';

const routes = [
	{
		path: '/',
		components: {
			default: App,
			nav: Navigation,
			footer: Footer
		}
	},
	{
		path: '/about',
		components: {
			default: About,
			nav: Navigation,
			footer: Footer
		}
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: 'is-active',
	mode: 'history'
});
