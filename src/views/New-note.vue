<template>
	<div class="new-note-component">
		<card class="card-content">
			<form @submit.prevent="onSubmit" @input="resetError" class="new-note-form">
				<label for="title">Title</label><br>
				<input type="text" name="title" v-model="title"><br>
				<p v-if="errorsNewNote.title !== undefined" class="card-content__error">{{ errorsNewNote.title }}</p>
				<hr>
				<textarea type="text" name="body" v-model="body"></textarea><br>
				<p v-if="errorsNewNote.body !== undefined" class="card-content__error">{{ errorsNewNote.body }}</p>
				<button type="submit">Save</button>
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
					Axios.post(`/user/new`, {
						title: this.title,
						body: this.body
					})
						.then(response => {
							if (response.data.error) {
								this.serverError = response.data.error;
								this.show = 'retry';
							} else {
								this.show = 'toLogin';
							}
						})
						.catch(e => {
							alert('Error: ' + e.message);
						});
				}
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

	.new-user-component {
		background-color: $accent-color;
		text-align: center;
	}

	.card-content__error {
		margin: 0px;
		padding: 0px;
		color: red;
	}
</style>
