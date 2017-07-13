
import axios from 'axios';
import router from '../router/index-routes';

export default {
	user: {
		authenticated: false
	},

	login(context, creds) {
		axios.post(`/login`, creds)
			.then(response => {
				console.log(response.data);
				if (response.data.success) {
					this.user.authenticated = true;
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('userId', response.data.userId);
					console.log('values set in local storage');
					// router.push('/');
					window.location.href = '/';
				} else {
					context.errorLogin =true;
					context.serverError = response.data.message;
				}
			})
			.catch(e => {
				context.errorLogin =true;
				context.serverError = e;
			});
	},

	logout() {
		localStorage.removeItem('token');
		this.user.authenticated = false;
	},

	checkAuth() {
		const jwt = window.localStorage.getItem('token');
		if (jwt) {
			this.user.authenticated = true;
			return true;
		} else {
			this.user.authenticated = false;
			return false;
		}
	},
};
