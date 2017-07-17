<template>
	<div class="labels-component">
		<div v-if="labels && labels.length" class="labels-content row">
			<span v-for="label of labels" :key="label.name" v-bind:style="{ background: label.color }" class="label-content">
				{{ label.name }}
			</span>
		</div>
		<form @submit.prevent="addLabel" class="add-label-form">
			<input v-model="newLabel.name" placeholder="add label" type="text" name="label" maxlength="15" class="label-input">
		</form>
	</div>
</template>

<script>
	import notesApi from '../api/notes-api';
	export default {
		data() {
			return {
				newLabel: {
					name: '',
					color: 'rgba(0, 255, 0, 0.1)'
				},
				errorApi: undefined
			};
		},
		computed: {
			userId() {
				return this.$store.state.userId;
			},
			labels() {
				return this.$store.state.labels;
			}
		},
		methods: {
			addLabel() {
				if (this.newLabel.name !== '') {
					let addLabel = true;
					this.labels.forEach((label) => {
						if (label.name === this.newLabel.name) addLabel = false;
					});
					if (addLabel) {
						this.$store.dispatch('addLabel', this.newLabel);
						notesApi.updateLabels(this, this.labels)
							.then(response => console.log(response))
							.catch(error => console.log(error));
					}
				}
				this.newLabel = {
					name: '',
					color: 'rgba(0, 255, 0, 0.1)'
				};
			}
		},
		mounted() {
			notesApi.getLabels(this)
				.then((response) => {
					if (!response.error) {
						this.$store.dispatch('setLabels', response.labels);
					}
				})
				.catch((response) => {
					console.log(response.error);
				});
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.labels-component {
		width: 80%;
		border: 1px solid $secondary-color;
		margin: 2rem auto 1rem auto;
		padding: 2px;
		border-radius: 5px;
	}

	.labels-content {
		margin: 2px auto;
		justify-content: center;
	}

	.label-content {
		color: $accent-color;
		border: 1px solid $secondary-color;
		border-radius: 2px;
		margin: 2px;
		padding: 2px;
		min-width: 5rem;
		text-align: center;
	}

	.add-label-form {
		width: 80%;
		margin: 2px auto;
		padding: 2px;
		text-align: center;
	}

	.label-input {
		background: $extra-color;
		border: none;
		text-align: center;
		width: 80%;
		margin: auto;

		&:focus {
			background: $accent-color;
			border: none;
			box-shadow: 0px 0px 1px 1px rgba(116, 115, 114, 0.1);
			background: $extra-color;
		}
	}
</style>
