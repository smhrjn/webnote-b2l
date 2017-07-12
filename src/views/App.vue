<template>
  <div id="app" class="app-component">
    <div v-if="notes && notes.length" class="row center-xs center-s center-md center-lg">
			<div v-for="note of notes" :key="note.title" class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
				<card class="card-content">
					<h2>{{ note.title }}</h2>
					<h3>{{ note.date }}</h3>
					<div>{{ note.body }}</div>
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
  </div>
</template>

<script>
	import Axios from 'axios';
	import Card from '../components/Card.vue';
	export default {
		name: 'app',
		components: { Card },
		data() {
			return {
				userId: '5966157ce746a7197c792364',
				noteList: [],
				notes: [],
				errorsApp: []
			};
		},
		created() {
			if (this.userId) {
				Axios.get(`/user/${this.userId}/notes`)
					.then(response => {
						this.noteList = response.data;
						if (this.noteList.length){
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

<style lang="scss">
	@import "~styles/variables.scss";

	.app-component {
		background-color: $accent-color;
		flex-grow: 1;
	}
</style>
