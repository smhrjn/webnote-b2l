import store from '../vuex/store';
import axios from 'axios';

export default {
	deleteNote(context, noteId) {
		axios.delete(`/user/${ store.state.userId }/${ noteId }`, { headers: { 'x-access-token': store.state.token } })
			.then(response => {
				store.dispatch('removeNote', noteId);
				console.log('note deleted');
			})
			.catch(e => context.errorApi.push(e));
	},
	login(context, creds) {
		axios.post(`/login`, creds)
			.then(response => {
				if (response.data.success) {
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('userId', response.data.userId);
					store.dispatch('setUserId', response.data.userId);
					store.dispatch('setToken', response.data.token);
					context.$router.push('/');
					// window.location.href = '/';
				} else {
					context.errorApi = response.data.message;
				}
			})
			.catch(e => {
				console.log(e);
				context.errorApi = 'Problem in Catch Section';
			});
	},
	createNote(context, note) {
		return new Promise((resolve, reject) => {
			axios.post(`/user/${ store.state.userId }/note`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.error) {
						context.errorApi = response.data.error;
						reject('cannot create note');
					} else {
						resolve(response.data);
					}
				})
				.catch(e => {
					console.log('Error: ' + e.message);
					reject('cannot create note');
				});
		});
	},
	updateNote(context, noteId, note) {
		return new Promise((resolve, reject) => {
			axios.put(`/user/${ store.state.userId }/${ noteId }`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						resolve('updated');
					} else {
						reject('cannot update');
					}
				})
				.catch(e => {
					context.errorApi.push(e);
					reject('cannot update');
				});
		});
	},
	getNotes(context) {
		return new Promise((resolve, reject) => {
			axios.get(`/user/${ store.state.userId }/notes`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					resolve(response.data);
				})
				.catch(e => {
					context.errorApi.push(e);
					reject('could not get notelist');
				});
		});
	}
};
