<template>
	<div class="new-user-component">
		<card class="card-content" v-if="show === 'form'">
			<form @submit.prevent="onSubmit" @input="resetError" class="new-user-form">
				<label for="name">Name</label><br>
				<input type="text" name="name" v-model="userName"><br>
				<p v-if="errorsSignUp.userName !== undefined" class="card-content__error">{{ errorsSignUp.userName }}</p>
				<label for="email">Email</label><br>
				<input type="email" name="email" v-model="email"><br>
				<p v-if="errorsSignUp.email !== undefined" class="card-content__error">{{ errorsSignUp.email }}</p>
				<label for="password">Password</label><br>
				<input type="password" name="password" v-model="password"><br>
				<p v-if="errorsSignUp.password !== undefined" class="card-content__error">{{ errorsSignUp.password }}</p>
				<label for="passwordRepeat">Confirm Passwort</label><br>
				<input type="password" name="passwordRepeat" v-model="passwordRepeat"><br>
				<p v-if="errorsSignUp.passwordRepeat !== undefined" class="card-content__error">{{ errorsSignUp.passwordRepeat }}</p>
				<input type="submit" value="Submit">
			</form>
		</card>
		<card class="card-content" v-if="show === 'retry'">
			<div>User could not be created: {{ serverError }}</div>
			<button @click="show = 'form'">Try Again</button>
		</card>
		<card class="card-content" v-if="show === 'toLogin'">
			<div>User created successfully.</div>
			<button @click="toLogin">Log in</button>
		</card>
	</div>
</template>

<script>
	import Axios from 'axios';
	import Card from '../components/Card.vue';
	export default {
		name: 'about',
		components: { Card },
		data() {
			return {
				show: 'form',
				userName: 'me',
				email: 'me@mymail.com',
				password: 'myPassword',
				passwordRepeat: 'myPassword',
				errorsSignUp: {
					userName: undefined,
					email: undefined,
					password: undefined,
					passwordRepeat: undefined,
				},
				serverError: ''
			};
		},
		methods: {
			onSubmit() {
				let errorCount = 0;
				if (this.userName === '') {
					this.errorsSignUp.userName = 'Please Provide User Name';
					errorCount++;
				}
				if (this.email === '') {
					this.errorsSignUp.email = 'Please Provide Email Address';
					errorCount++;
				}
				if (this.password === '') {
					this.errorsSignUp.password = 'Please Provide Password';
					errorCount++;
				}
				if (this.passwordRepeat === '') {
					this.errorsSignUp.passwordRepeat = 'Please Confirm Password';
					errorCount++;
				}
				if (errorCount === 0) {
					Axios.post(`/user/new`, {
						name: this.userName,
						email: this.email,
						password: this.password
					})
						.then(response => {
							if (response.data.error) {
								this.serverError = response.data.error;
								this.show = 'retry';
							} else {
								this.show = 'toLogin';
							}
						})
						.catch(e => {
							alert('Error: ' + e.message);
						});
				}
			},
			resetError() {
				this.errorsSignUp = {
					userName: undefined,
					email: undefined,
					password: undefined,
					passwordRepeat: undefined,
				};
			},
			toLogin() {
				this.$router.push('/login');
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.new-user-component {
		background-color: $accent-color;
		text-align: center;
	}

	.card-content__error {
		margin: 0px;
		padding: 0px;
		color: red;
	}
</style>
