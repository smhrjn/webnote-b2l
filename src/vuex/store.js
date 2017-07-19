import Vue from 'vue';
import Vuex from 'vuex';

import colors from '../js/colors';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userName: window.localStorage.userName,
		userId: window.localStorage.userId,
		token: window.localStorage.token,
		labels: [],
		notes: [],
		notesFilter: '',
		labelColors: colors
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
				return note._id !== noteId;
			});
		},
		ADD_LABEL(state, label) {
			state.labels.push(label);
		},
		REMOVE_LABEL(state, remLabel) {
			state.labels = state.labels.filter((label) => {
				return label.name !== remLabel.name;
			});
		},
		SET_LABELS(state, labels) {
			state.labels = labels;
		},
		CLEAR_USER_DATA(state) {
			localStorage.removeItem('userName');
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.removeItem('labels');
			state.userName = undefined;
			state.userID = undefined;
			state.token = undefined;
			state.notes = [];
			state.labels = [];
		},
		CLEAR_NOTES(state) {
			state.notes = [];
		},
		SET_FILTER(state, label) {
			state.notesFilter = label;
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
		addLabel({ commit	}, label) {
			commit('ADD_LABEL', label);
		},
		removeLabel({ commit	}, remLabel) {
			commit('REMOVE_LABEL', remLabel);
		},
		setLabels({ commit	}, labels) {
			commit('SET_LABELS', labels);
		},
		clearUserData({ commit	}) {
			commit('CLEAR_USER_DATA');
		},
		clearNotes({ commit	}) {
			commit('CLEAR_NOTES');
		},
		setFilter({ commit	}, filter) {
			commit('SET_FILTER', filter);
		}
	},
	getters: {
		isAuth: state => state.userId && state.token,
		notesCount: state => state.notes.length
	}
});
