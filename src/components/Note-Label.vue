<template>
	<div class="label-component" v-bind:class="{ 'label-component--selected': selected }">
		<span v-bind:style="{ background: label.color }" class="label-component__name" @click="onSelect">
			{{ label.name }}
		</span>
		<span class="label-tooltip">
			<button @click.stop="deleteLabel" v-if="editEnabled" >Delete</button>
			<button @click.stop="editLabel">Edit</button>
		</span>
		<modal v-if="showEditModal" class="edit-label-modal">
			<form class="edit-label-form">
				<input type="text" maxlength="10" name="name" v-model="modalLabel.name" class="edit-modal-form__name" v-bind:disabled="!editEnabled">
				<select v-model="modalLabel.color" class="edit-modal-form__color" v-bind:style="{ background: modalLabel.color }">
					<option v-for="color in colors" v-bind:key="color.name" v-bind:value="color.hex" v-bind:style="{ background: color.hex }">
						{{ color.name }}
					</option>
				</select>
				<button @click.stop.prevent="updateLabel" class="button-general">Save</button>
				<button @click.stop.prevent="cancelChange" class="button-general">Cancel</button>
			</form>
		</modal>
	</div>
</template>

<script>
	import notesApi from '../api/notes-api';
	import modal from './Modal.vue';
	export default {
		props: ['label'],
		components: { modal },
		data() {
			return {
				showEditModal: false,
				modalLabel: {}
			};
		},
		computed: {
			selected() {
				// console.log(this.label.name === this.$store.state.notesFilter);
				return this.label._id === this.$store.state.notesFilter;
			},
			colors() {
				return this.$store.state.labelColors;
			},
			editEnabled() {
				return this.label.name !== 'default';
			},
			labels() {
				return this.$store.state.labels;
			}
		},
		methods: {
			onSelect() {
				if (this.selected) {
					this.$store.dispatch('setFilter', '');
				}	else {
					this.$store.dispatch('setFilter', this.label._id);
				}
			},
			deleteLabel() {
				notesApi.deleteLabel(this, this.label._id)
					.then(response => {
						this.$store.state.notes.forEach((note) => {
							if (note.labelId === this.label._id) {
								note.labelId = this.$store.state.labels[0]._id;
							}
						});
						this.alertify.success('Label Deleted');
						this.$store.dispatch('removeLabel', this.label);
					})
					.catch(err => console.log(err));
			},
			editLabel() {
				this.modalLabel = {
					name: this.label.name,
					color: this.label.color
				};
				this.showEditModal = true;
			},
			updateLabel() {
				this.modalLabel.name = this.modalLabel.name.toLowerCase();
				let updateLabel = true;
				this.labels.forEach((label) => {
					if (label.name === this.modalLabel.name) updateLabel = false;
				});
				if (updateLabel) {
					notesApi.updateLabel(this, this.label._id, this.modalLabel);
					this.label.name = this.modalLabel.name;
					this.label.color = this.modalLabel.color;
					// notesApi.updateLabels(this);
					this.showEditModal = false;
					this.alertify.success('Label Updated');
				} else {
					this.alertify.error('Label exists already.');
				}
			},
			cancelChange() {
				this.showEditModal = false;
			}
		},
		created() {
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.label-component {
		position: relative;
		border: 1px solid $secondary-color;
		border-radius: 2px;
		margin: 2px;
		padding: 0px;
		min-width: 5rem;
		text-align: center;

		&--selected {
			// border: 4px solid #fff;
			box-shadow: 1px 1px 2px 2px #fff;
		}

		&__name {
			display: inline-block;
			border-radius: 2px;
			width: 100%;
			margin: 0px;
			padding: 0px;
			cursor: pointer;
			text-align: center;
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

	.edit-label-modal .modal-content {
		width: 20rem;
		max-width: 90%;
		position: fixed;
		margin: 30vh auto auto 5%;
		border-radius: 5px;
		background: $extra-color;
		text-align: center;
	}

	.edit-modal-form__name{
		display: block;
		text-align: center;
		width: 100%;
		border-radius: 5px 5px 0px 0px;
	}

	.edit-modal-form__color {
		display: block;
		width: 100%;
		border-radius: 0px;
	}
</style>
