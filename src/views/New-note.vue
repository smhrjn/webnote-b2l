<template>
	<div class="new-note-component">
		<card class="card-content">
			<form @submit.prevent="onSubmit" @input="resetError" class="new-note-form">
				<label for="title">Title</label><br>
				<input type="text" maxlength="20" name="title" v-model="title" class="new-note-component__title"><br>
				<p v-if="errorsNewNote.title !== undefined" class="card-content__error">{{ errorsNewNote.title }}</p>
				<hr>
				<textarea rows="8" type="text" name="body" v-model="body" class="new-note-component__text"></textarea><br>
				<p v-if="errorsNewNote.body !== undefined" class="card-content__error">{{ errorsNewNote.body }}</p>
				<button type="submit" class="button-general">Save</button>
				<button @click="onCancel" class="button-general">Cancel</button>
			</form>
		</card>
	</div>
</template>

<script>
	import Axios from 'axios';
	import Card from '../components/Card.vue';
	export default {
		name: 'NewNote',
		components: { Card },
		data() {
			return {
				title: '',
				body: '',
				userId: '5966157ce746a7197c792364',
				errorsNewNote: {
					title: undefined,
					body: undefined
				},
				serverError: ''
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
					Axios.post(`/user/${this.userId}/note`, {
						title: this.title,
						body: this.body
					})
						.then(response => {
							if (response.data.error) {
								this.serverError = response.data.error;
							} else {
								this.$router.push('/');
							}
						})
						.catch(e => {
							alert('Error: ' + e.message);
						});
				}
			},
			onCancel() {
				this.$router.push('/');
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
