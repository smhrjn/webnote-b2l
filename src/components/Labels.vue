<template>
	<div class="labels-component">
		<div v-if="labels && labels.length" class="labels-content row">
			<notelabel v-for="label of labels" :key="label.name" :label="label"></notelabel>
		</div>
		<form @submit.prevent="addLabel" class="add-label-form">
			<select v-model="newLabel.color" v-bind:style="{ background: newLabel.color }" class="label-color">
				<option v-for="color in colors" v-bind:key="color" v-bind:value="color" v-bind:style="{ background: color }">
					{{ color }}
				</option>
			</select>
			<input v-model="newLabel.name" placeholder="add label" type="text" name="label" maxlength="15" class="label-input">
		</form>
	</div>
</template>

<script>
	import notesApi from '../api/notes-api';
	import notelabel from './Note-label.vue';
	export default {
		components: { notelabel },
		data() {
			return {
				newLabel: {
					name: '',
					color: '#F0B67F'
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
			},
			colors() {
				return this.$store.state.labelColors;
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
					color: this.colors[0]
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
		background: $extra-color;
	}

	.labels-content {
		margin: 2px auto;
		justify-content: center;
	}

	.add-label-form {
		width: 80%;
		margin: 2px auto;
		padding: 2px;
		text-align: center;
		border-radius: 5px;
		border: 1px solid $secondary-color;
	}

	.label-input {
		background: $extra-color;
		border: none;
		text-align: center;
		width: 60%;
		margin: auto;
		border-radius: 2px;

		&:focus {
			background: $extra-color;
			border: none;
			box-shadow: 0px 0px 1px 1px rgba(116, 115, 114, 0.1);
		}
	}

	.label-color {
		width: 30%;
	}
</style>
