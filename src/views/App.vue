<template>
  <div id="app" class="app-component">
		<card v-if="!token" class="col-xs-12 col-sm-8 app-error">
			Please Log in to view your Notes.
			<br>
			<button class="button-general" @click="$router.push('/login')">Log In</button>
			<hr>
			If you do not have accout yet.
			<br>
			<button class="button-general" @click="$router.push('/signup')">Sign Up</button>
		</card>

    <div v-else-if="notes && notes.length" class="row center-xs center-s center-md center-lg">
			<div v-for="note of notes" :key="note.title" class="col-xs-12 col-sm-8 col-md-6 col-lg-4" @click="editNote(note)">
				<card class="card-content">
					<div class="card-content__title">{{ note.title }}<button @click.stop="onDelete(note)" class="button-general close-general">X</button></div>
					<div class="card-content__date">{{ note.date | formatDate('LL') }}</div>
					<div class="card-content__body">{{ note.body }}</div>
				</card>
			</div>
		</div>

		<div v-else>
			<card v-if="!loadingData" class="col-xs-12 col-sm-8 app-error">
				You haven't created any notes yet.
				<br>
				<button class="button-general" @click="$router.push('/newnote')">Create your first note.</button>
			</card>

			<square-loader v-else :loading="loadingData" :color="spinnerColor" class="spinner"></square-loader>
		</div>

		<div v-if="errorsApp && errorsApp.length" class="row">
			<card v-for="error of errorsApp" :key="error" class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center">
				{{error.message}}
			</card>
		</div>

		<modal v-if="showModal">
			<form class="edit-note-form">
				<label for="title">Title</label><br>
				<input type="text" maxlength="20" name="title" v-model="modalNote.title" class="edit-note-form__title"><br>
				<hr>
				<textarea rows="8" type="text" name="body" v-model="modalNote.body" class="edit-note-form__text"></textarea><br>
			</form>
			<button @click="updateNote" class="button-general">Save</button>
			<button @click="cancelChange" class="button-general">Cancel</button>
		</modal>
  </div>
</template>

<script>
	import axios from 'axios';
	import SquareLoader from 'vue-spinner/src/SquareLoader.vue';
	import card from '../components/Card.vue';
	import modal from '../components/Modal.vue';
	export default {
		name: 'app',
		components: { card, modal, SquareLoader },
		data() {
			return {
				noteList: [],
				errorsApp: [],
				showModal: false,
				modalNote: { },
				noteToUpdate: undefined,
				loadingData: true,
				spinnerColor: 'green'
			};
		},
		computed: {
			userId() {
				return this.$store.state.userId;
			},
			token() {
				return this.$store.state.token;
			},
			notes() {
				return this.$store.state.notes;
			}
		},
		methods: {
			onDelete(noteToDelete) {
				axios.delete(`/user/${ this.userId }/${ noteToDelete._id }`, { headers: { 'x-access-token': this.token } })
					.then(response => {
						this.$store.dispatch('removeNote', noteToDelete._id);
						console.log('note deleted');
					})
					.catch(e => this.errorsApp.push(e));
			},
			editNote(noteToEdit) {
				console.log('clicked to edit');
				this.noteToUpdate = noteToEdit;
				this.modalNote = {
					_id: noteToEdit._id,
					title: noteToEdit.title,
					body: noteToEdit.body
				};
				this.showModal = true;
			},
			updateNote() {
				this.showModal = false;
				axios.put(`/user/${this.userId}/${this.modalNote._id}`, {
					title: this.modalNote.title,
					body: this.modalNote.body
				}, { headers: { 'x-access-token': this.token } })
					.then(response => {
						this.noteToUpdate.title = this.modalNote.title;
						this.noteToUpdate.body = this.modalNote.body;
						console.log('note updated');
					})
					.catch(e => this.errorsApp.push(e));
			},
			cancelChange() {
				this.showModal = false;
			}
		},
		created() {
			this.loadingData = true;
			this.$store.dispatch('clearNotes');
			if (this.userId) {
				this.$http.get(`/user/${ this.userId }/notes`, { headers: { 'x-access-token': this.token } })
					.then(response => {
						this.noteList = response.data;
						if (this.noteList.length) {
							this.noteList.forEach((noteId) => {
								axios.get(`/user/${this.userId}/${noteId._id}`, { headers: { 'x-access-token': this.token } })
									.then(response => this.$store.dispatch('addNote', response.data))
									.catch(e => console.log(e));
							});
						}
						this.loadingData = false;
					})
					.catch(e => {
						this.errorsApp.push(e);
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "~styles/variables.scss";

	.app-component {
		background-color: $accent-color;
		flex-grow: 1;
	}

	.card-content {
		cursor: pointer;

		&__title {
			font-size: 1.2rem;
			color: greenyellow;
		}

		&__date {
			font-size: 0.6rem;
			text-align: left;
			margin: 0px;
			padding: 3px;
			border-bottom: 2px solid $accent-color;
		}

		&__body {
			height: 10rem;
			overflow: auto;
			text-overflow: ellipsis;
			margin: 0px;
			padding: 3px;
			white-space: pre;
			text-align: left;
			background-color: #BAA378;
			// height: 4rem;
		}
	}

	.edit-note-form {
		text-align: center;
		margin: auto;
		width: 80%;

		&__title {
			width: 80%;
		}

		&__text {
			width: 100%;
		}
	}

	.app-error {
		box-sizing: border-box;
		margin: auto;
		text-align: center;
	}

	.spinner {
		top: 20%;
		padding: 20%;
	}
</style>
