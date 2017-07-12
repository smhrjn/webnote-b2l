
import Axios from 'axios';
import router from '../router/index-routes';

export default {
	user: {
		authenticated: false
	},

	login(context, creds) {
		Axios.post(`/login`, creds)
			.then(response => {
				console.log(response.data);
				if (response.data.success) {
					this.user.authenticated = true;
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('userId', response.data.userId);
					router.push('/');
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
		const jwt = localStorage.getItem('token');
		if (jwt) {
			this.user.authenticated = true;
		} else {
			this.user.authenticated = false;
		}
	},
};
