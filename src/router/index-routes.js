import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Navigation from '../views/Navigation.vue';
import SignUp from '../views/Sign-up.vue';
import NewNote from '../views/New-note.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';

const routes = [
	{
		path: '/',
		components: {
			default: Main,
			nav: Navigation
		}
	},
	{
		path: '/signup',
		components: {
			default: SignUp,
			nav: Navigation
		}
	},
	{
		path: '/newnote',
		components: {
			default: NewNote,
			nav: Navigation
		}
	},
	{
		path: '/login',
		components: {
			default: Login,
			nav: Navigation
		}
	},
	{
		path: '/about',
		components: {
			default: About,
			nav: Navigation
		}
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: 'is-active',
	mode: 'history'
});
