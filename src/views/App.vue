<template>
  <div id="app">
    <div v-if="users && users.length">
			<card v-for="user of users">
				<p>Name: {{user.name}}</p>
				<p>Email: {{user.email}}</p>
			</card>
		</div>

		<div v-if="errors && errors.length">
			<card v-for="error of errors">
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
				users: [],
				errors: []
			}
		},
		created() {
			Axios.get(`/users`)
			.then(response => {
				this.users = response.data;
			})
			.catch(e => {
				this.errors.push(e);
			})
		}
	}
</script>

<style scoped>

</style>
