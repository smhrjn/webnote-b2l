<template>
	<div class="modal-component" v-show="showModal">
		<div class="modal-content">
			<slot>Modal Box</slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showModal: true
			};
		},
		props: ['note'],
		methods: {

		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.modal-component {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0,0,0,0.8);
		z-index: 9999;
		opacity:1;
		-webkit-transition: opacity 400ms ease-in;
		-moz-transition: opacity 400ms ease-in;
		transition: opacity 400ms ease-in;
		pointer-events: auto;
	}

	.modal-content {
		width: 80%;
		position: relative;
		margin: 10% auto auto auto;
		border-radius: 0px;
		background: $extra-color;
		text-align: center;
	}
</style>
