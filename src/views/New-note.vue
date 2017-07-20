<template>
	<div class="new-note-component">
		<card class="card-content">
			<form @submit.prevent="onSubmit" @input="resetError" class="new-note-form">
				<input type="text" maxlength="20" name="title" v-model="title" class="new-note-component__title" placeholder="title">
				 <select v-model="selectedLabel"  class="new-note-component__label" v-bind:style="{ background: selectedLabel.color }">
					<option v-for="label in labels" v-bind:key="label.name" v-bind:value="label" v-bind:style="{ background: label.color }">
						{{ label.name }}
					</option>
				</select>
				<p v-if="errorsNewNote.title !== undefined" class="card-content__error">{{ errorsNewNote.title }}</p>
				<textarea v-bind:rows="textAreaHeight" type="text" name="body" v-model="body" class="new-note-component__text" placeholder="Type content here"></textarea>
				<br>
				<p v-if="errorsNewNote.body !== undefined" class="card-content__error">{{ errorsNewNote.body }}</p>
				<button type="submit" class="button-general">Save</button>
				<button @click.prevent="onCancel" class="button-general">Cancel</button>
				<button @click.prevent="toggleWebClip" class="button-general">Clip Text from Web</button>
				<div class="webclip" :class="{closed:!showUrlGet}">
					<span class="confirm-box__text">Insert the URL:</span>
					<form @submit.prevent="webRead" @input="resetError" class="url-form">
						<input type="text" name="urlToRead" v-model="urlToRead">
						<button type=submit class="button-general">Go!</button>
						<p v-if="errorsNewNote.url !== undefined" class="card-content__error">{{ errorsNewNote.url }}</p>
				    </form>
				</div>
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
				urlToRead: '',
				errorsNewNote: {
					title: undefined,
					body: undefined,
					url: undefined
				},
				erorrApi: undefined,
				showModal: false,
				selectedLabel: { name: 'default', color: '#FF7F50' },
				showUrlGet: false,
				textAreaHeight: 8
			};
		},
		computed: {
			labels() {
				return this.$store.state.labels;
			}
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
					console.log('selected label: ' + this.selectedLabel);
					notesApi.createNote({
						title: this.title,
						body: this.body,
						labelId: this.selectedLabel._id
					})
						.then(response => {
							this.alertify.success('note created');
							this.$store.dispatch('addNote', {
								_id: response._id,
								date: response.date,
								title: this.title,
								body: this.body,
								labelId: this.selectedLabel._id
							});
							this.$store.dispatch('setFilter', '');
							this.$router.push('/');
						})
						.catch(err => {
							this.errorApi = err;
							this.alertify.error(err);
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
			toggleWebClip() {
				this.showUrlGet = !this.showUrlGet;
			},
			webRead() {
				let errorCount = 0;
				if (this.urlToRead === '') {
					this.errorsNewNote.url = 'URL cannot be empty.';
					errorCount++;
				}
				if (errorCount === 0) {
					notesApi.readWeb(this.urlToRead)
						.then(response => {
							if (response.error) {
								this.errorsNewNote.url = response.error;
								this.alertify.error(response.error);
							} else {
								this.title = response.result.title;
								this.body = response.result.content.replace(/\\n/g, '\n');
								// console.log(this.body);
								this.textAreaHeight = Math.min(this.body.split(/\r\n|\r|\n/).length, 40);
								this.alertify.success('Text Fetched.');
							}
						})
						.catch(err => {
							this.errorsNewNote.url = err;
							this.alertify.error(err);
						});
				}
			},
			resetError() {
				this.errorsNewNote = {
					title: undefined,
					body: undefined,
					url: undefined,
					selectedLabel: this.labels[0]
				};
			}
		},
		created() {
			if (!this.$store.state.labels.length) {
				notesApi.getLabels()
					.then((response) => {
						if (!response.error) {
							this.$store.dispatch('setLabels', response);
							this.selectedLabel = this.$store.state.labels[0];
							this.alertify.success('Labels Fetched.');
						}
					})
					.catch((err) => {
						console.log(err);
						this.errorApi = err;
						this.alertify.error(err);
					});
			} else {
				this.selectedLabel = this.$store.state.labels[0];
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.new-note-component {
		// background-color: $accent-color;
		// align-self: stretch;
		text-align: center;
		flex-grow: 1;

		&__title {
			font-size: 1.1rem;
			width: 12rem;
			margin: 5px auto 2px;
			max-width: 90%;
		}

		&__label {
			font-size: 1.0rem;
			width: 6rem;
			max-width: 90%;
			margin: 2px;
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

	.closed {
		display:none;
	}
</style>
