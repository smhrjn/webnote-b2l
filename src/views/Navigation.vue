<template>
	<div class="nav-component">
		<ul class="nav-component__ul">
			<router-link to="/" exact tag="li" class="nav-component__li">
				<a class="nav-component__a">Home</a>
			</router-link>
			<router-link to="/about" tag="li" class="nav-component__li">
				<a class="nav-component__a">About</a>
			</router-link>
			<router-link to="/signup" tag="li" class="nav-component__li" v-show="!token">
				<a class="nav-component__a">Sign Up</a>
			</router-link>
			<router-link to="/login" tag="li" class="nav-component__li" v-show="!token">
				<a class="nav-component__a">Log in</a>
			</router-link>
			<router-link to="/newnote" tag="li" class="nav-component__li" v-show="token">
				<a class="nav-component__a">New Note</a>
			</router-link>
			<li class="nav-component__li" v-show="token" @click="logOut">
				<a class="nav-component__a">Log Out</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'navigation',
		data() {
			return {
				message: 'some message',
				token: window.localStorage.token
			};
		},
		methods: {
			logOut() {
				console.log('clearing user');
				localStorage.removeItem('token');
				localStorage.removeItem('userId');
				// this.$router.push('/');
				window.location.reload();
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.nav-component {
		background-color: $extra-color;
		justify-content: center;
		flex-grow: 0;
		width: 100%;
		padding: 0;

		@at-root #{&}__ul {
			padding: 0px;
			width: 80%;
			margin: auto;
			list-style-type: none;
			text-align: center;
 		 }

		@at-root #{&}__li {
			background: $secondary-color;
			color: black;
			display: block;
			margin: 0.5rem;
			padding: 0;
			box-sizing: border-box;
			// border: 1px solid $accent-color;
			box-shadow: 2px 2px 1px 0px rgba(14,15,14,0.5);

			&:hover {
				box-shadow: 3px 3px 1px 1px rgba(14,15,14,0.5);
			}
 		}

  	@at-root #{&}__a {
			text-decoration: none;
			display: inline-block;
			color: black;
			width: 100%;
  	}
	}
</style>
