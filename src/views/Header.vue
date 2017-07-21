<template>
	<div class="header-component">
		<span class="hide-xxs">Notes</span>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.header-component {
		position: fixed;
		width: 100%;
		background-color: $primary-color;
		font-size: 2rem;
		color: $accent-color;
		justify-content: center;
		align-items: center;
		min-height: 5rem;
		margin: 0px;
		padding: 0px;
		z-index: 2;
	}
</style>
