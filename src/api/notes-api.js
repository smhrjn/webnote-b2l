import axios from './axios-instance';
import store from '../vuex/store';
import router from '../router/index-routes';

export default {
	login(creds) {
		return new Promise((resolve, reject) => {
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
						router.push('/');
						// window.location.href = '/';
						resolve('Logged In.');
					} else {
						console.log(response.data.error);
						reject(response.data.error);
					}
				})
				.catch(err => {
					console.log(err);
					reject(err);
				});
		});
	},
	changePassword(creds) {
		return new Promise((resolve, reject) => {
			axios.put(`/login`, creds, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (!response.data.error) {
						resolve(response.data.message);
					} else {
						console.log(response.data.error);
						reject(response.data.error);
					}
				})
				.catch(err => {
					console.log(err);
					reject(err);
				});
		});
	},
	deleteAccount() {
		return new Promise((resolve, reject) => {
			axios.delete(`/user/${ store.state.userId }`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					console.log('account deleted');
					resolve('Account Deleted.');
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	readWeb(url) {
		return new Promise((resolve, reject) => {
			axios.get(`/web-reader?urlToRead=${url}`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					// console.log(response.data.result.content);
					resolve(response.data);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	createNote(note) {
		return new Promise((resolve, reject) => {
			axios.post(`/user/${ store.state.userId }/note`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.name === 'TokenExpiredError') {
						router.push('/login');
					}
					if (response.data.error) {
						reject(response.data.error);
					} else {
						resolve(response.data);
					}
				})
				.catch(err => {
					console.log('Error: ' + err);
					reject(err);
				});
		});
	},
	updateNote(noteId, note) {
		return new Promise((resolve, reject) => {
			axios.put(`/user/${ store.state.userId }/${ noteId }`, note, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						resolve(response.data.message);
					} else {
						reject(response.data.error);
					}
				})
				.catch(err => {
					console.log(err);
					reject(JSON.stringify(err));
				});
		});
	},
	deleteNote(noteId) {
		return new Promise((resolve, reject) => {
			axios.delete(`/user/${ store.state.userId }/${ noteId }`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					store.dispatch('removeNote', noteId);
					console.log('note deleted');
					resolve(response.data.error);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	getNotes() {
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
					reject(err);
				});
		});
	},
	createLabel(newLabel) {
		return new Promise((resolve, reject) => {
			axios.post(`/user/${ store.state.userId }/label`, newLabel, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						// console.log(response.data.message);
						resolve(response.data);
					}
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	deleteLabel(labelId) {
		const defaultId = store.state.labels.filter((label) => label.name === 'default')[0]._id;
		return new Promise((resolve, reject) => {
			axios.delete(`/label/${ store.state.userId }/${ labelId }/${ defaultId }`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					store.dispatch('removeLabel', labelId);
					console.log('label deleted');
					resolve(response.data.message);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	updateLabel(labelId, newLabel) {
		return new Promise((resolve, reject) => {
			axios.put(`/label/${ store.state.userId }/${ labelId }`, newLabel, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					if (response.data.message) {
						resolve(response.data.message);
					} else {
						reject(response.data.error);
					}
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	getLabels() {
		return new Promise((resolve, reject) => {
			axios.get(`/user/${ store.state.userId }/labels`, { headers: { 'x-access-token': store.state.token } })
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
};
