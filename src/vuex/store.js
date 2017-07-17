import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userId: window.localStorage.userId,
		token: window.localStorage.token,
		labels: [],
		notes: []
	},
	mutations: {
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
				return label !== remLabel;
			});
		},
		SET_LABELS(state, labels) {
			state.labels = labels;
		},
		CLEAR_USER_DATA(state) {
			state.userID = undefined;
			state.token = undefined;
			state.notes = [];
			state.labels = [];
		},
		CLEAR_NOTES(state) {
			state.notes = [];
		}
	},
	actions: {
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
		}
	},
	getters: {
		isAuth: state => state.userId && state.token,
		notesCount: state => state.notes.length
	}
});
