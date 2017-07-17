<template>
	<span v-bind:style="{ background: label.color }" class="label-component" v-bind:class="{ 'label-component--selected': selected }" @click="onSelect">
		{{ label.name }}
		<span class="label-tooltip">
			<button @click.stop="deleteLabel">Delete</button>
			<button @click.stop="editLabel">Edit</button>
		</span>
	</span>
</template>

<script>
	export default {
		props: ['label'],
		data() {
			return {
			};
		},
		computed: {
			selected() {
				console.log(this.label.name === this.$store.state.notesFilter);
				return this.label.name === this.$store.state.notesFilter;
			}
		},
		methods: {
			onSelect() {
				if (this.selected) {
					this.$store.dispatch('setFilter', '');
				}	else {
					this.$store.dispatch('setFilter', this.label.name);
				}
			},
			deleteLabel() {

			},
			editLabel() {

			}
		},
		mounted() {

		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.label-component {
		cursor: pointer;
		position: relative;
		border: 1px solid $secondary-color;
		border-radius: 2px;
		margin: 2px;
		padding: 2px;
		min-width: 5rem;
		text-align: center;

	  &--selected {
			border: 4px solid yellowgreen;
			border-radius: 6px;
		}
	}

	.label-tooltip {
		display: none;
		background-color: rgba(12, 12, 12, 0.3);
		color: $secondary-color;
		text-align: center;
		padding: 0.1rem;
		font-size: 0.7rem;
		border-radius: 0.2rem;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		width: 6rem;
		left: 0%;

		button {
			// width: 50%;
			background: rgba(12, 12, 12, 0.5);
			color: $accent-color;
			border: none;
		}
	}

	.label-component:hover .label-tooltip {
		display: block;
		top: -1.0rem;
	}
</style>
