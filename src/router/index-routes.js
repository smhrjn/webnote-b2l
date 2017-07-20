import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Navigation from '../views/Navigation.vue';
import SignUp from '../views/Sign-up.vue';
import NewNote from '../views/New-note.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import UserSettings from '../views/UserSettings.vue';
import store from '../vuex/store';

const routes = [
	{
		path: '/',
		components: {
			default: Main,
			nav: Navigation
		},
		beforeEnter(to, from, next) {
			if (!store.state.token) {
				next('/login');
			}
			next();
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
		},
		beforeEnter(to, from, next) {
			if (!store.state.token) {
				next('/login');
			}
			next();
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
	},
	{
		path: '/usersettings',
		components: {
			default: UserSettings,
			nav: Navigation
		},
		beforeEnter(to, from, next) {
			if (!store.state.token) {
				next('/login');
			}
			next();
		}
	},
	{
		path: '*',
		components: {
			default: Main,
			nav: Navigation
		}
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: 'is-active',
	mode: 'history'
});
