<template>
  <div id="main" class="main-component">
		<card v-if="!token" class="col-xs-12 col-sm-8 main-error">
			Please Log in to view your Notes.
			<br>
			<button class="button-general" @click="$router.push('/login')">Log In</button>
			<hr>
			If you do not have account yet.
			<br>
			<button class="button-general" @click="$router.push('/signup')">Sign Up</button>
		</card>

    <div v-else-if="notes && notes.length" class="row center-xs center-s center-md center-lg notes-container">
			<div v-for="note of notes" :key="note.title" class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
				<note :note="note"></note>
			</div>
		</div>

		<div v-else-if="this.notesFilter === ''">
			<card v-if="!loadingData" class="col-xs-12 col-sm-8 main-error">
				You haven't created any notes yet.
				<br>
				<button class="button-general" @click="$router.push('/newnote')">Create your first note.</button>
			</card>

			<moon-loader v-else :loading="loadingData" :color="spinnerColor" class="spinner"></moon-loader>
		</div>

		<div v-else-if="this.notesFilter !== ''">
			<card class="col-xs-12 col-sm-8 main-error">
				There are no cards with selected Label.
			</card>
		</div>

		<div v-else-if="errorApi" class="col-xs-12 col-sm-8 main-error">
				{{ errorApi }}
		</div>
  </div>
</template>

<script>
	import notesApi from '../api/notes-api';
	import MoonLoader from 'vue-spinner/src/Moonloader.vue';
	import card from '../components/Card.vue';
	import modal from '../components/Modal.vue';
	import note from '../components/Note.vue';
	export default {
		name: 'main',
		components: { card, modal, note, MoonLoader },
		data() {
			return {
				errorApi: undefined,
				showModal: false,
				loadingData: false,
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
			notesFilter() {
				return this.$store.state.notesFilter;
			},
			notes() {
				if (this.$store.state.notesFilter === '') return this.$store.state.notes;
				return this.$store.state.notes.filter(note => note.label.name === this.$store.state.notesFilter);
			}
		},
		methods: {

		},
		created() {
			if (this.$store.getters.notesCount <= 0) {
				this.loadingData = true;
				// setTimeout(() => {
				if (this.$store.state.token) {
					notesApi.getNotes(this)
						.then(response => {
							// console.log('response: ' + response);
							// response.forEach(note => this.$store.dispatch('addNote', note));
							this.loadingData = false;
						})
						.catch(err => {
							console.log(err);
							this.errorApi = err;
							this.loadingData = false;
						});
				}
				// }, 50000);
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.main-component {
		background-color: $accent-color;
		flex-grow: 1;
		align-content: center;
	}

	.notes-container {
		justify-content: flex-start;
		align-items: baseline;

		&:last-child {
			margin-bottom: 1rem;
		}

		@media only screen and (max-width: 991px) {
			justify-content: center;
		}
	}

	.main-error {
		text-align: center;
		margin: 5% auto;
	}

	.spinner {
		margin: 20% auto;
		width: 5rem;
	}
</style>
