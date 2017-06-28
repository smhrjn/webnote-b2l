<template>
  <div id="app">
    <div v-if="users && users.length" class="row center-xs center-s center-md center-lg">
			<div v-for="user of users" :key="user.name" class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
				<card class="card-content">
					<p>Name: {{user.name}}</p>
					<p>Email: {{user.email}}</p>
				</card>
			</div>
		</div>

		<div v-if="errors && errors.length" class="row">
			<card v-for="error of errors" :key="error" class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center">
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
		components: {Card},
		data() {
			return {
				users: [],
				errors: []
			};
		},
		created() {
			Axios.get(`/users`)
				.then(response => {
					this.users = response.data;
				})
				.catch(e => {
					this.errors.push(e);
				});
		}
	};
</script>

<style scoped>
	.card-content {
		margin: 5px 5px;
	}
</style>
