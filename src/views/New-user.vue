<template>
	<div class="new-user-component">
		<card class="card-content">
			<form action="/user/new" method="post" class="new-user-form">
				Name:<br>
				<input type="text" name="name" value="name"><br>
				Email:<br>
				<input type="email" name="email" value="email"><br><br>
				<input type="submit" value="Submit">
			</form>
		</card>
	</div>
</template>

<script>
	import Card from '../components/Card.vue';
	export default {
		name: 'about',
		components: { Card },
		data() {
			return {
				message: 'message for about page'
			};
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.new-user-component {
		background-color: $accent-color;
		text-align: center;
	}
</style>
