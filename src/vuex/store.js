import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userName: window.localStorage.userName,
		userId: window.localStorage.userId,
		token: window.localStorage.token,
		notes: []
	},
	mutations: {
		SET_NAME(state, userName) {
			state.userName = userName;
		},
		SET_ID(state, id) {
			state.userId = id;
		},
		SET_TOKEN(state, token) {
			state.token = token;
		},
		ADD_NOTE(state, note) {
			state.notes.push(note);
		},
		REMOVE_NOTE(state, noteId) {
			state.notes = state.notes.filter((note) => {
				console.log('removing note with id: ' + noteId);
				return note._id !== noteId;
			});
		},
		CLEAR_USER_DATA(state) {
			state.userName = undefined;
			state.userID = undefined;
			state.token = undefined;
			state.notes = [];
		},
		CLEAR_NOTES(state) {
			state.notes = [];
		}
	},
	actions: {
		setUserName({ commit }, userName) {
			commit('SET_NAME', userName);
		},
		setUserId({ commit }, userId) {
			commit('SET_ID', userId);
		},
		setToken({ commit	}, token) {
			commit('SET_TOKEN', token);
		},
		addNote({ commit	}, note) {
			commit('ADD_NOTE', note);
		},
		removeNote({ commit	}, noteId) {
			commit('REMOVE_NOTE', noteId);
		},
		clearUserData({ commit	}) {
			commit('CLEAR_USER_DATA');
		},
		clearNotes({ commit	}) {
			commit('CLEAR_NOTES');
		}
	},
	getters: {
		isAuth: state => state.userId && state.token,
		notesCount: state => state.notes.length
	}
});
