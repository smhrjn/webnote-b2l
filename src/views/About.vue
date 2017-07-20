<template>
	<div class="about-component">
		<card class="card-content">
			<div class="about-title">Web Application for Simple Notes</div>
			<span class="text--special">(built with Node, Vue and Bootstrap)</span>
			<hr>
			<div class="about-description"><span class="text--special">What you can do</span>
				<ul class="about-list">
					<li> Create Notes </li>
					<li> Update Notes </li>
					<li> Delete Notes </li>
				</ul>
			</div>
			<hr>
			<div>
				<span class="text--special">Source code on</span>
				<a target="_blank" href="https://github.com/leovcunha/webnote-b2l">
					<img class="github-image" :src="'../assets/github-icon.png'" alt="Github">
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

			};
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.about-component {
		// background-color: $accent-color;
		text-align: center;
		font-size: 1rem;
		flex-grow: 1;
	}

	.about-title {
		font-size: 2rem;
		color: greenyellow;
	}

	.about-description {
		margin: 1rem;
		text-align: left;
		color: $accent-color;
	}

	.about-list {
		color: $accent-color;
		list-style-type: square;
	}

	.github-image {
		display: inline-block;
		height: 2rem;
		margin: -0.5rem;
	}
</style>
