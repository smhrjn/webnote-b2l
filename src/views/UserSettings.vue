<template>
	<div class="pwchange-component">
		<card class="card-content">
			<div class="pwchange-component__title">Change Passoword</div>
			<hr>
			<form @submit.prevent="onSubmit" @input="resetError" class="pw-change-form">
				<label for="oldpassword">Old Password</label><br>
				<input type="text" name="oldpassword" v-model="oldPassword"><br>
				<p v-if="errorsChange.oldPassword !== undefined" class="card-content__error">{{ errorsChange.oldPassword }}</p>
				<label for="newpassword1">New Password</label><br>
				<input type="password" name="password" v-model="newPassword1"><br>
				<label for="newpassword2">Repeat New Password</label><br>
				<input type="password" name="password" v-model="newPassword2"><br>
				<p v-if="errorsChange.password !== undefined" class="card-content__error">{{ errorsChange.password }}</p>
				<button type="submit" class="button-general">Change Password</button>
			</form>
		</card>
		<card class="card-content" v-if="msgApi">
			<div>{{ msgApi }}</div>

		</card>
		<br>
		<div class="deleteacc-component">
			<card class="card-content">
				<br>
				<br>
				<button class="redbutton" @click.stop="deleteAcc">DELETE ACCOUNT</button>
				<br>
				<br>
			</card>
			<modal v-if="showDeleteModal">
				<div class="confirm-box">
					<span class="confirm-box__text">Delete Account? Are you Sure? There's no turning back!</span>
					<hr>
					<button @click.stop="onConfirm" class="button-general">Yes</button>
					<button @click.stop="onDeny" class="button-general">No</button>
				</div>
			</modal>
		</div>

	</div>

</template>

<script>
	import Card from '../components/Card.vue';
	import modal from '../components/Modal.vue';
	import notesApi from '../api/notes-api';
	export default {
		name: 'UserSettings',
		components: { Card, modal },
		data() {
			return {
				oldPassword: '',
				newPassword1: '',
				newPassword2: '',
				errorsChange: {
					oldPassword: undefined,
					password: undefined
				},
				msgApi: undefined,
				showDeleteModal: false
			};
		},
		methods: {
			onSubmit() {
				let errorCount = 0;
				if (this.oldPassword === '') {
					this.errorsChange.oldPassword = 'Please Provide Old Password';
					errorCount++;
				}
				if (this.newPassword1 === '' || this.newPassword2 === '') {
					this.errorsChange.password = 'Please Provide New Password';
					errorCount++;
				}
				if (this.newPassword1 !== this.newPassword2) {
					this.errorsChange.password = 'Passwords don`t match';
					errorCount++;
				}
				if (errorCount === 0) {
					console.log(this.$store.state.userName );
					notesApi.changePassword(this, {
						name: this.$store.state.userName,
						oldpassword: this.oldPassword,
						newpassword: this.newPassword1
					});
				}
			},
			resetError() {
				this.errorsChange = {
					oldPassword: undefined,
					password: undefined,
				};
				this.msgApi = undefined;
			},
			deleteAcc() {
				this.showDeleteModal = true;
			},
			onConfirm() {
				this.showDeleteModal = false;
				notesApi.deleteAccount(this);
				this.$store.dispatch("clearUserData");
				this.$router.push('/');
			},
			onDeny() {
				this.showDeleteModal = false;
			}


		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.pwchange-component {
		// background-color: $accent-color;
		text-align: center;

		&__title {
			font-size: 1.2rem;
			margin: 20px auto 2px auto;
			color: yellowgreen;
		}
	}

	.card-content__error {
		padding: 0px;
		color: red;
	}

	.redbutton {
		background: red;
		color: $accent-color;
		font-size: 0.8rem;
		border: none;
		margin: 0.2rem auto;

		&:hover {
			box-shadow: 2px 2px 1px 0px rgba(14,15,14,0.5);
		}
	}
</style>
