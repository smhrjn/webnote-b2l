<template>
	<div class="nav-component">
		<ul>
			<router-link to="/" exact tag="li">
				<a>Home</a>
			</router-link>
			<router-link to="/about" tag="li">
				<a>About</a>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {

	};
</script>

<style scoped>
	.nav-component {
		background-color: #dddddd;
		min-height: calc(100vh - 5em);
	}
</style>
