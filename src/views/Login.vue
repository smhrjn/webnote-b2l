<template>
	<div class="login-component">
		<card class="card-content">
			<form action="/login" method="post" class="login-form">
				Name:<br>
				<input type="text" name="name" value=""><br><br>
                Password:<br>
				<input type="password" name="password" value=""><br><br>
				<input type="submit" value="Submit">
			</form>
		</card>
	</div>
</template>

<script>
	import Card from '../components/Card.vue';
	export default {
		name: 'login',
		components: {Card},
		data() {
			return {

			};
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.login-component {
		background-color: $accent-color;
		text-align: center;
	}

</style>
