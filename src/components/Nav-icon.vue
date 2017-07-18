<template>
	<div class="nav-icon" v-bind:class="{ open: iconOpen }" @click="onClick">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				iconOpen: false
			};
		},
		methods: {
			onClick() {
				this.iconOpen = !this.iconOpen;
				window.scroll(0, 0);
				this.$emit('navtoggle');
			}
		}
	};
</script>

<style lang="scss" scoped>
 	@import "~styles/variables.scss";

	.nav-icon {
		width: 90%;
		height: 90%;
		margin: auto;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: .5s ease-in-out;
		-moz-transition: .5s ease-in-out;
		-o-transition: .5s ease-in-out;
		transition: .5s ease-in-out;
		cursor: pointer;
	}

	.nav-icon span {
		display: block;
		position: absolute;
		height: 10%;
		width: 100%;
		background: $accent-color;
		border-radius: 10%;
		opacity: 1;
		left: 0;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: .25s ease-in-out;
		-moz-transition: .25s ease-in-out;
		-o-transition: .25s ease-in-out;
		transition: .25s ease-in-out;
	}

	.nav-icon span:nth-child(1) {
		top: 15%;
	}

	.nav-icon span:nth-child(2),.nav-icon span:nth-child(3) {
		top: 50%;
	}

	.nav-icon span:nth-child(4) {
		top: 85%;
	}

	.nav-icon.open span:nth-child(1) {
		top: 50%;
		width: 0%;
		left: 50%;
	}

	.nav-icon.open span:nth-child(2) {
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.nav-icon.open span:nth-child(3) {
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}

	.nav-icon.open span:nth-child(4) {
		top: 50%;
		width: 0%;
		left: 50%;
	}
</style>
