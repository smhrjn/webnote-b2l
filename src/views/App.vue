<template>
  <div id="app" class="app-component">
    <div v-if="users && users.length" class="row center-xs center-s center-md center-lg">
			<div v-for="user of users" :key="user.name" class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
				<card class="card-content">
					<h2>Title</h2>
					<h3>Date</h3>
					{{user.name}} | {{user.email}}
					<div>dafaasd fsa fsd fsaf afdfas
						fdasfsdafdasfds
						fsdfasfsa
						fdsfdas
						fdsf
						saf
						dasf
						sdfs
						fsaf
						asf
						fafs
						dfdsf
						saf
						sf
						sdfsd
						f
					</div>
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

<style lang="scss">
	@import "~styles/variables.scss";

	// .card-content {
	// 	margin: 5px 5px;
	// }
	.app-component {
		background-color: $accent-color;
	}
</style>
