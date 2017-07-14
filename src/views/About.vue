<template>
	<div class="about-component">
		<card class="card-content">
			<div>This is simple web application built with VueJs.</div>
			<div>Create Simple Notes. Update and Delete Functionality available.</div>
			<div>Encryption Feature will be added soon.</div>
			<h3>Important</h3>
			<div>You must use fake username, email and password. This app is not secure at all.</div>
			<hr>
			<div>If terrible code does not bother you:
				<a target="_blank" href="https://github.com/leovcunha/webnote-b2l">
					<svg class="github-icon">
						<use xlink:href="./assets/github-icon.svg"></use>
					</svg>
				</a>
			</div>
		</card>
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
		font-size: 1rem;
		flex-grow: 1;
	}

	.github-icon {
		color: black;
	}
</style>
