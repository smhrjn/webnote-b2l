<template>
	<div class="login-component">
		<card class="card-content">
			<form @submit.prevent="onSubmit" @input="resetError" class="log-in-form">
				<label for="name">Name</label><br>
				<input type="text" name="name" v-model="userName"><br>
				<p v-if="errorsLogin.userName !== undefined" class="card-content__error">{{ errorsLogin.userName }}</p>
				<label for="password">Password</label><br>
				<input type="password" name="password" v-model="password"><br>
				<p v-if="errorsLogin.password !== undefined" class="card-content__error">{{ errorsLogin.password }}</p>
				<button type="submit" class="button-general">To My Notes</button>
			</form>
		</card>
		<card class="card-content" v-if="errorLogin">
			<div>Wrong Username or Password</div>
			<div>Please Try Again</div>
		</card>
	</div>
</template>

<script>
	import auth from '../auth/authentiate';
	import Card from '../components/Card.vue';
	export default {
		name: 'login',
		components: { Card },
		data() {
			return {
				userName: '',
				password: '',
				errorsLogin: {
					userName: undefined,
					password: undefined
				},
				serverError: undefined,
				errorLogin: false
			};
		},
		methods: {
			onSubmit() {
				let errorCount = 0;
				if (this.userName === '') {
					this.errorsLogin.userName = 'Please Provide User Name';
					errorCount++;
				}
				if (this.password === '') {
					this.errorsLogin.password = 'Please Provide Password';
					errorCount++;
				}
				if (errorCount === 0) {
					auth.login(this, {
						name: this.userName,
						password: this.password,
					});
				}
			},
			resetError() {
				this.errorsLogin = {
					userName: undefined,
					password: undefined,
				};
				this.errorLogin = false;
				this.serverError = undefined;
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.login-component {
		background-color: $accent-color;
		text-align: center;
	}

	.card-content__error {
		margin: 0px;
		padding: 0px;
		color: red;
	}
</style>
