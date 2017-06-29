<template>
	<div class="nav-component">
		<ul class="nav-component__ul">
			<router-link to="/" exact tag="li">
				<a class="nav-component__a">Home</a>
			</router-link>
			<router-link to="/about" tag="li">
				<a class="nav-component__a">About</a>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.nav-component {
		background-color: $secondary-color;
		justify-content: center;

		@at-root #{&}__ul {
			padding: 0px;
			margin: 0px;
			list-style-type: none;
			text-align: center;
 		 }

  	@at-root #{&}__a {
			text-decoration: none;
  	}
	}
</style>
