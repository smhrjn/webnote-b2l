<template>
	<div class="new-user-component">
		<card class="card-content">
			<form action="/user/new" method="post" class="new-user-form">
				Name:<br>
				<input type="text" name="name" value="name"><br>
				Email:<br>
				<input type="email" name="email" v-model="emailValue" v-validate="emailValue" data-vv-rules="required|mail"><br><br>
				<p v-if="errors.has('email')">{{ errors.first('email') }}</p>
				<input type="submit" value="Submit">
			</form>
		</card>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VeeValidate from 'vee-validate';
	Vue.use(VeeValidate);
	import Card from '../components/Card.vue';
	export default {
		name: 'about',
		components: { Card },
		data() {
			return {
				emailValue: '',
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
