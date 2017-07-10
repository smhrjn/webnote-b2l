<template>
	<div class="about-component">
		<card class="card-content">This is about Page</card>
	</div>
</template>

<script>
	import Card from '../components/Card.vue';
	export default {
		name: 'about',
		components: { Card },
		data() {
			return {
				message: 'message for about page'
			};
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.about-component {
		background-color: $accent-color;
		text-align: center;
		font-size: 3rem;
	}
</style>
