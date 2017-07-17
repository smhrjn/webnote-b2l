<template>
	<div class="new-note-component">
		<card class="card-content">
			<form @submit.prevent="onSubmit" @input="resetError" class="new-note-form">
				<label for="title" class="text--special">Title</label><br>
				<input type="text" maxlength="20" name="title" v-model="title" class="new-note-component__title"><br>
				<p v-if="errorsNewNote.title !== undefined" class="card-content__error">{{ errorsNewNote.title }}</p>
				<hr>
				<textarea rows="8" type="text" name="body" v-model="body" class="new-note-component__text"></textarea><br>
				<p v-if="errorsNewNote.body !== undefined" class="card-content__error">{{ errorsNewNote.body }}</p>
				<button type="submit" class="button-general">Save</button>
				<button @click.prevent="onCancel" class="button-general">Cancel</button>
			</form>
		</card>
		<modal v-if="showModal">
			<div class="confirm-box">
				<span class="confirm-box__text">Exit Without Saving?</span>
				<hr>
				<button @click.stop="onConfirm" class="button-general">Yes</button>
				<button @click.stop="onDeny" class="button-general">No</button>
			</div>
		</modal>
	</div>
</template>

<script>
	import notesApi from '../api/notes-api';
	import card from '../components/Card.vue';
	import modal from '../components/Modal.vue';
	export default {
		name: 'NewNote',
		components: { card, modal },
		data() {
			return {
				title: '',
				body: '',
				userId: window.localStorage.getItem('userId'),
				token: window.localStorage.getItem('token'),
				errorsNewNote: {
					title: undefined,
					body: undefined
				},
				erorrApi: '',
				showModal: false
			};
		},
		methods: {
			onSubmit() {
				let errorCount = 0;
				if (this.title === '') {
					this.errorsNewNote.title = 'Title cannot be empty.';
					errorCount++;
				}
				if (this.body === '') {
					this.errorsNewNote.body = 'No Content Added';
					errorCount++;
				}
				if (errorCount === 0) {
					notesApi.createNote(this, {
						title: this.title,
						body: this.body
					})
						.then(response => {
							this.$store.dispatch('addNote', {
								_id: response._id,
								date: response.date,
								title: this.title,
								body: this.body
							});
							this.$router.push('/');
						});
				}
			},
			onCancel() {
				this.showModal = true;
			},
			onConfirm() {
				this.showModal = false;
				this.$router.push('/');
			},
			onDeny() {
				this.showModal = false;
			},
			resetError() {
				this.errorsNewNote = {
					title: undefined,
					body: undefined
				};
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.new-note-component {
		background-color: $accent-color;
		text-align: center;
		flex-grow: 1;

		&__title {
			width: 80%;
		}

		&__text {
			width: 90%;
		}
	}

	.card-content__error {
		margin: 0px;
		padding: 0px;
		color: red;
	}
</style>
