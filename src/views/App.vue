<template>
  <div id="app">
    <message>
			<ul v-if="users && users.length">
				<li v-for="user of users">
					<p><strong>{{user._id}}</strong></p>
					<p>{{user.name}}</p>
					<p>{{user.email}}</p>
				</li>
			</ul>

			<ul v-if="errors && errors.length">
				<li v-for="error of errors">
					{{error.message}}
				</li>
			</ul>
		</message>
  </div>
</template>

<script>
	import Axios from 'axios';
	import Message from '../components/Message.vue';
	export default {
		name: 'app',
		components: { Message },
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
