<template>
	<div class="card-component">
		<slot></slot>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.card-component {
		background-color: $secondary-color;
		box-shadow: 0px 0px 1px 1px rgba(14,15,14,0.5);
		padding: 0rem;
		margin-top: 1rem;
	}

	// .card-component:hover {
	// 	box-shadow: 3px 3px 1px 1px rgba(14,15,14,0.5);
	// }
</style>
