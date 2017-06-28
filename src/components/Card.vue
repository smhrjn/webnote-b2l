<template>
	<div class="card-component">
		<p>
			<slot></slot>
		</p>
	</div>
</template>

<script>
	export default {

	};
</script>

<style scoped>
	.card-component {
		background-color: #dddddd;
		box-shadow: 2px 2px 1px 0px rgba(14,15,14,0.5);
	}

	.card-component:hover {
		box-shadow: 3px 3px 1px 1px rgba(14,15,14,0.5);
	}
</style>
