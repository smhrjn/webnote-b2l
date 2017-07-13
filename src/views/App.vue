<template>
  <div id="app" class="app-component">
    <div v-if="notes && notes.length" class="row center-xs center-s center-md center-lg">
			<div v-for="note of notes" :key="note.title" class="col-xs-12 col-sm-8 col-md-6 col-lg-4" @click="editNote(note)">
				<card class="card-content">
					<div class="card-content__title">{{ note.title }}<button @click.stop="onDelete(note)" class="button-general close-general">X</button></div>
					<div class="card-content__date">{{ note.date | formatDate('LL') }}</div>
					<hr>
					<div class="card-content__body">{{ note.body }}</div>
				</card>
			</div>
		</div>

		<div v-else class="row">
			<card>Please Log in or Sign Up to view your Notes</card>
		</div>

		<div v-if="errorsApp && errorsApp.length" class="row">
			<card v-for="error of errorsApp" :key="error" class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center">
				{{error.message}}
			</card>
		</div>

		<modal v-show="showModal">
			<form class="edit-note-form">
				<label for="title">Title</label><br>
				<input type="text" name="title" v-model="modalNote.title" class="edit-note-form__title"><br>
				<hr>
				<textarea rows="8" type="text" name="body" v-model="modalNote.body" class="edit-note-form__text"></textarea><br>
			</form>
			<button @click="updateNote" class="button-general">Save</button>
			<button @click="cancelChange" class="button-general">Cancel</button>
		</modal>
  </div>
</template>

<script>
	import Axios from 'axios';
	import Card from '../components/Card.vue';
	import Modal from '../components/Modal.vue';
	export default {
		name: 'app',
		components: { Card, Modal },
		data() {
			return {
				userId: '5966157ce746a7197c792364',
				noteList: [],
				notes: [],
				errorsApp: [],
				showModal: false,
				modalNote: { },
				noteToUpdate: undefined
			};
		},
		methods: {
			onDelete(noteToDelete) {
				Axios.delete(`/user/${this.userId}/${noteToDelete._id}`)
					.then(response => {
						this.notes = this.notes.filter((note) => {
							return note._id !== noteToDelete._id;
						});
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
				Axios.put(`/user/${this.userId}/${this.modalNote._id}`, {
					title: this.modalNote.title,
					body: this.modalNote.body
				})
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
			if (this.userId) {
				Axios.get(`/user/${this.userId}/notes`)
					.then(response => {
						this.noteList = response.data;
						if (this.noteList.length) {
							this.noteList.forEach((noteId) => {
								Axios.get(`/user/${this.userId}/${noteId._id}`)
									.then(response => this.notes.push(response.data))
									.catch(e => console.log(e));
							});
						}
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
		// height: 10rem;
		&__title {
			font-size: 1.2rem;
			color: greenyellow;
		}

		&__date {
			font-size: 0.6rem;
			text-align: left;
			margin: 2px;
		}

		&__body {
			overflow: hidden;
			text-overflow: ellipsis;
			margin: 0px;
			padding: 3px;
			white-space: pre;
			text-align: left;
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
</style>
