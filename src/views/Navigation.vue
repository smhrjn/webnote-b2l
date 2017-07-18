<template>
	<div class="nav-component">
		<ul class="nav-component__ul">
			<router-link to="/" exact tag="li" class="nav-component__li">
				<a class="nav-component__a">Home</a>
			</router-link>
			<router-link to="/login" tag="li" class="nav-component__li" v-show="!token">
				<a class="nav-component__a">Log in</a>
			</router-link>
			<router-link to="/signup" tag="li" class="nav-component__li" v-show="!token">
				<a class="nav-component__a">Sign Up</a>
			</router-link>
			<router-link to="/newnote" tag="li" class="nav-component__li" v-show="token">
				<a class="nav-component__a">New Note</a>
			</router-link>
			<li class="nav-component__li" v-show="token" @click="logOut">
				<a href="#" class="nav-component__a">Log Out</a>
			</li>
			<router-link to="/about" tag="li" class="nav-component__li">
				<a class="nav-component__a">About</a>
			</router-link>
		</ul>
		<labels v-if="token"></labels>
	</div>
</template>

<script>
	import labels from '../components/Labels.vue';
	export default {
		name: 'navigation',
		components: { labels },
		computed: {
			token() {
				return this.$store.state.token;
			}
		},
		methods: {
			logOut() {
                console.log('clearing user');
				this.$store.dispatch('clearUserData');
				this.$router.push('/');
				// window.location.reload();
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
			margin: 1rem auto auto auto;
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
			border-radius: 3px;
			border: none;
			// box-shadow: 0px 0px 0px 1px rgba(14,15,14,0.5);

			&:hover {
				box-shadow: 0px 0px 0px 1.5px rgba(250,250,250,0.5);
			}
 		}

  	@at-root #{&}__a {
			text-decoration: none;
			display: inline-block;
			color: black;
			width: 100%;

			&:hover {
				text-decoration: none;
				color: greenyellow;
			}
		}

		.is-active {
			font-size: 1.25rem;

			a {
				color: $accent-color;
				text-decoration: none;
				// box-shadow: 0px 0px 1px 1px rgba(14,15,14,0.5);
			}
		}

	}
</style>
