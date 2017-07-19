<template>
	<div class="labels-component">
		<div v-if="labels && labels.length" class="labels-content row">
			<notelabel v-for="label of labels" :key="label.name" :label="label"></notelabel>
		</div>
		<form @submit.prevent="addLabel" class="add-label-form">
			<select v-model="newLabel.color" v-bind:style="{ background: newLabel.color }" class="label-color">
				<option v-for="color in colors" v-bind:key="color.name" v-bind:value="color.hex" v-bind:style="{ background: color.hex }">
					{{ color.name }}
				</option>
			</select>
			<input v-model="newLabel.name" placeholder="add label" type="text" name="label" maxlength="10" class="label-input">
		</form>
		<span class="labels-tooltip">
			Click on Label : Toggle Filter
		</span>
	</div>
</template>

<script>
	import notesApi from '../api/notes-api';
	import notelabel from './Note-Label.vue';
	export default {
		components: { notelabel },
		data() {
			return {
				newLabel: {
					name: '',
					color: 'orange'
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
					this.newLabel.name = this.newLabel.name.toLowerCase();
					let addLabel = true;
					this.labels.forEach((label) => {
						if (label.name === this.newLabel.name) addLabel = false;
					});
					if (addLabel) {
						notesApi.createLabel(this, this.newLabel)
							.then(response => {
								// console.log(response);
								this.$store.dispatch('addLabel', {
									_id: response._id,
									name: this.newLabel.name,
									color: this.newLabel.color
								});
								this.alertify.success('Label Created');
								this.newLabel = {
									name: '',
									color: this.colors[0]
								};
							})
							.catch(error => console.log(error));
					}
				}
			}
		},
		mounted() {

		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.labels-component {
		position: relative;
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

	.labels-tooltip {
		display: none;
		background-color: rgba(12, 12, 12, 0.6);
		color: #fff;
		text-align: center;
		padding: 0.1rem;
		font-size: 0.7rem;
		border-radius: 0.2rem;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		width: 100%;
		left: 0%;
	}

	.labels-component:hover .labels-tooltip {
		display: block;
		top: -1.5rem;
	}
</style>
