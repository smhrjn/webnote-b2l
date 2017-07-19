import axios from './axios-instance';
import store from '../vuex/store';
import router from '../router/index-routes';

export default {
	login(context, creds) {
		axios.post(`/login`, creds)
			.then(response => {
				if (!response.data.error) {
					console.log('Storing data in localstorage and vuex.');
					localStorage.setItem('userName', creds.name);
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('userId', response.data.userId);
					store.dispatch('setUserName', creds.name);
					store.dispatch('setUserId', response.data.userId);
					store.dispatch('setToken', response.data.token);
					console.log('Data set in localstorage and vuex.');
					context.$router.push('/');
					// window.location.href = '/';
				} else {
					console.log(response.data.error);
					context.errorApi = response.data.error;
				}
			})
			.catch(err => {
				console.log(err);
				context.errorApi = err;
			});
	},
	changePassword(context, creds) {
		axios.put(`/login`, creds, { headers: { 'x-access-token': store.state.token } })
			.then(response => {
				if (!response.data.error) {
					context.msgApi = response.data.message;
				} else {
					console.log(response.data.error);
					context.msgApi = response.data.error;
				}
			})
			.catch(err => {
				console.log(err);
				context.msgApi = 'Problem in Catch Section';
			});
	},
	deleteAccount(context) {
		axios.delete(`/user/${ store.state.userId }`, { headers: { 'x-access-token': store.state.token } })
			.then(response => {
				console.log('account deleted');
			})
			.catch(err => {
				context.msgApi = err;
			});
	},

	createNote(context, note) {
		return new Promise((resolve, reject) => {
			axios.post(`/user/${ store.state.userId }/note`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.name === 'TokenExpiredError') {
						router.push('/login');
					}
					if (response.data.error) {
						context.errorApi = response.data.error;
						reject('cannot create note');
					} else {
						resolve(response.data);
					}
				})
				.catch(err => {
					console.log('Error: ' + err.error);
					reject('cannot create note');
				});
		});
	},
	updateNote(context, noteId, note) {
		return new Promise((resolve, reject) => {
			axios.put(`/user/${ store.state.userId }/${ noteId }`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						resolve('updated note');
					} else {
						reject('cannot update note');
					}
				})
				.catch(err => {
					context.errorApi = err;
					reject('cannot update note');
				});
		});
	},
	deleteNote(context, noteId) {
		axios.delete(`/user/${ store.state.userId }/${ noteId }`, { headers: { 'x-access-token': store.state.token } })
			.then(response => {
				store.dispatch('removeNote', noteId);
				console.log('note deleted');
			})
			.catch(err => {
				context.errorApi = err;
			});
	},
	getNotes(context) {
		return new Promise((resolve, reject) => {
			axios.get(`/user/${ store.state.userId }/notes`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					// console.log('received response: ' + response.data);
					// console.log('received notes');
					store.dispatch('clearNotes');
					response.data.forEach(note => store.dispatch('addNote', note));
					resolve(response.data);
				})
				.catch(err => {
					context.errorApi = err;
					reject('could not get notelist: ' + err);
				});
		});
	},
	createLabel(context, newLabel) {
		return new Promise((resolve, reject) => {
			axios.post(`/user/${ store.state.userId }/label`, newLabel, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						// console.log(response.data.message);
						resolve(response.data);
					}
				})
				.catch(err => {
					context.errorApi = err;
					reject('cannot create label');
				});
		});
	},
	deleteLabel(context, labelId) {
		const defaultId = store.state.labels.filter((label) => label.name === 'default')[0]._id;
		return new Promise((resolve, reject) => {
			axios.delete(`/label/${ store.state.userId }/${ labelId }/${ defaultId }`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					store.dispatch('removeLabel', labelId);
					console.log('label deleted');
					resolve('label deleted');
				})
				.catch(err => {
					context.errorApi = err;
					reject('cannot delete label');
				});
		});
	},
	updateLabel(context, labelId, newLabel) {
		return new Promise((resolve, reject) => {
			axios.put(`/label/${ store.state.userId }/${ labelId }`, newLabel, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						resolve('updated label');
					} else {
						reject('cannot update label');
					}
				})
				.catch(err => {
					context.errorApi = err;
					reject('cannot update label');
				});
		});
	},
	getLabels(context) {
		return new Promise((resolve, reject) => {
			axios.get(`/user/${ store.state.userId }/labels`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					context.errorApi = err;
					reject('could not get labels');
				});
		});
	}
};
