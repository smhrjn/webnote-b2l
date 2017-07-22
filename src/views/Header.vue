<template>
	<div class="header-component">
		<div class="nav-icon-container hidden-sm-up"><navicon class="main-nav-icon" v-on:navtoggle="toggleNav"></navicon></div>
		<span class="hide-xxs">Notes</span>
    <div class="dropdown-container"><dropdown v-model="userName" :text="userName"></dropdown></div>
	</div>
</template>

<script>
	import navicon from '../components/Nav-icon.vue';
	import dropdown from '../components/Dropdown.vue';
	export default {
		components: { navicon, dropdown },
		data() {
			return {

			};
		},
		methods: {
			toggleNav() {
				this.$emit('navtoggle');
			}
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			}
		}
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
