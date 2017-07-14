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
			<div>{{ serverError }}</div>
			<div>Please Try Again</div>
		</card>
	</div>
</template>

<script>
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
					this.$http.post(`/login`, {
						name: this.userName,
						password: this.password,
					})
						.then(response => {
							console.log(response.data);
							if (response.data.success) {
								localStorage.setItem('token', response.data.token);
								localStorage.setItem('userId', response.data.userId);
								console.log('values set in local storage');
								this.$store.dispatch('setUserId', response.data.userId);
								this.$store.dispatch('setToken', response.data.token);
								this.$router.push('/');
								// window.location.href = '/';
							} else {
								this.errorLogin =true;
								this.serverError = response.data.message;
							}
						})
						.catch(e => {
							console.log(e);
							this.errorLogin =true;
							this.serverError = 'Problem in Catch Section';
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
