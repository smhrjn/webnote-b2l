import store from '../vuex/store';
import axios from 'axios';

export default {
	deleteNote(context, noteId) {
		axios.delete(`/user/${ store.state.userId }/${ noteId }`, { headers: { 'x-access-token': store.state.token } })
			.then(response => {
				store.dispatch('removeNote', noteId);
				console.log('note deleted');
			})
			.catch(e => context.errorsMain.push(e));
	},
	login(context, creds) {
		axios.post(`/login`, creds)
			.then(response => {
				console.log(response.data);
				if (response.data.success) {
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('userId', response.data.userId);
					console.log('values set in local storage');
					store.dispatch('setUserId', response.data.userId);
					store.dispatch('setToken', response.data.token);
					context.$router.push('/');
					// window.location.href = '/';
				} else {
					context.errorLogin =true;
					context.serverError = response.data.message;
				}
			})
			.catch(e => {
				console.log(e);
				context.errorLogin =true;
				context.serverError = 'Problem in Catch Section';
			});
	},
	createNote(context, note) {
		return new Promise((resolve, reject) => {
			axios.post(`/user/${ store.state.userId }/note`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.error) {
						context.serverError = response.data.error;
						reject('cannot create note');
					} else {
						resolve(response.data);
					}
				})
				.catch(e => {
					console.errorLogin('Error: ' + e.message);
					reject('cannot create note');
				});
		});
	},
	updateNote(context, noteId, note) {
		return new Promise((resolve, reject) => {
			axios.put(`/user/${ store.state.userId }/${ noteId }`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					console.log('note update: ' + response.data.success);
					if (response.data.message) {
						resolve('updated');
					} else {
						reject('cannot update');
					}
				})
				.catch(e => {
					context.errorsMain.push(e);
					reject('cannot update');
				});
		});
	},
	getNotes(context) {
		return new Promise((resolve, reject) => {
			axios.get(`/user/${ store.state.userId }/notes`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					console.log(response.data);
					resolve(response.data);
				})
				.catch(e => {
					reject('could not get notelist');
					context.errorsMain.push(e);
				});
		});
	}
};
