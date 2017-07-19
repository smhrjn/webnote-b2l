import axios from 'axios';
import router from '../router/index-routes';
import store from '../vuex/store';
import alertify from 'alertify.js';

let Axios = axios.create({
	timeout: 5000
});

Axios.interceptors.response.use((response) => {
	// Do something with response data
	if (response.data.name === 'TokenExpiredError') {
		alertify.error('Please log in to continue.');
		console.log('clearing user');
		localStorage.removeItem('userName');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('labels');
		store.dispatch('clearUserData');
		router.push('/login');
	}
	return response;
}, (error) => {
	// Do something with response error
	return Promise.reject(error);
});

export default Axios;
