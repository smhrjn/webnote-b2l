<template>
	<card class="note-content">
		<div class="note-content-head" v-bind:style="{ background: label.color }">
			<div class="note-content__header" @click.stop="toggleBody">
				<div class="note-content__title">
					{{ note.title }}
				</div>
				<span class="note-tooltip">{{ tooltipMessage }}</span>
			</div>
			<span class="note-content__date">
				{{ note.date | formatDate('LL') }}
			</span>
			<span class="note-content__label">
				<select v-model="modalNote.label" class="note-content__select"
				v-bind:style="{ background: modalNote.label.color }" @click.once="editNoteLabel"
				@change="updateNote">
					<option v-for="ilabel in labels" v-bind:key="ilabel.name" v-bind:value="ilabel" v-bind:style="{ background: ilabel.color }">
						{{ ilabel.name }}
					</option>
				</select>
			</span>
			<button @click.stop="onDelete" class="button-general close-general">
				X
	  		<span class="note-tooltip">Delete Note</span>
			</button>
		</div>
		<div class="note-content__body" v-show="showBody"  @click="editNote()">{{ note.body }}
	  	<span class="note-tooltip">Click to edit note</span>
		</div>
		<modal v-if="showDeleteModal">
			<div class="confirm-box">
				<span class="confirm-box__text">Delete Note?</span>
				<hr>
				<button @click.stop="onConfirm" class="button-general">Yes</button>
				<button @click.stop="onDeny" class="button-general">No</button>
			</div>
		</modal>
		<modal v-if="showEditModal">
			<form class="edit-note-form">
				<input type="text" maxlength="20" name="title" v-model="modalNote.title" class="edit-note-form__title">
				<select v-model="modalNote.label" class="edit-note-form__label" v-bind:style="{ background: modalNote.label.color }">
					<option v-for="label in labels" v-bind:key="label.name" v-bind:value="label" v-bind:style="{ background: label.color }">
						{{ label.name }}
					</option>
				</select>
				<textarea rows="8" type="text" name="body" v-model="modalNote.body" class="edit-note-form__text"></textarea><br>
				<button @click.prevent="updateNote" class="button-general">Save</button>
				<button @click.prevent="cancelChange" class="button-general">Cancel</button>
			</form>
		</modal>
		<modal v-if="showCancelModal">
			<div class="confirm-box">
				<span class="confirm-box__text">Exit Without Saving?</span>
				<hr>
				<button @click.prevent="onExitConfirm" class="button-general">Yes</button>
				<button @click.prevent="onExitDeny" class="button-general">No</button>
			</div>
		</modal>
	</card>
</template>

<script>
	import card from '../components/Card.vue';
	import modal from '../components/Modal.vue';
	import notesApi from '../api/notes-api';
	export default {
		name: 'note',
		components: { card, modal },
		props: ['note'],
		data() {
			return {
				showBody: false,
				tooltipMessage: 'Click to show note',
				showDeleteModal: false,
				showEditModal: false,
				confirmDelete: false,
				showCancelModal: false,
				modalNote: {}
			};
		},
		computed: {
			labels() {
				return this.$store.state.labels;
			},
			label() {
				return this.labels.filter((label) => label._id === this.note.labelId)[0];
			}
		},
		methods: {
			editNote() {
				console.log('clicked to edit');
				this.modalNote = {
					_id: this.note._id,
					title: this.note.title,
					body: this.note.body,
					label: this.label
				};
				this.showEditModal = true;
			},
			editNoteLabel() {
				console.log('clicked label to change');
				this.modalNote = {
					_id: this.note._id,
					title: this.note.title,
					body: this.note.body,
					label: this.label
				};
				console.log(this.modalNote);
			},
			updateNote() {
				this.showEditModal = false;
				notesApi.updateNote(this, this.note._id, {
					title: this.modalNote.title,
					body: this.modalNote.body,
					labelId: this.modalNote.label._id
				}).then(() => {
					this.note.title = this.modalNote.title;
					this.note.body = this.modalNote.body;
					this.note.labelId = this.modalNote.label._id;
				});
			},
			cancelChange() {
				this.showCancelModal = true;
			},
			onExitConfirm() {
				this.showEditModal = false;
				this.showCancelModal = false;
			},
			onExitDeny() {
				this.showCancelModal = false;
			},
			onDelete() {
				this.showDeleteModal = true;
			},
			onConfirm() {
				this.showDeleteModal = false;
				notesApi.deleteNote(this, this.note._id);
			},
			onDeny() {
				this.showDeleteModal = false;
			},
			toggleBody() {
				this.showBody = !this.showBody;
				this.tooltipMessage = this.showBody ? 'Click to hide note' : 'Click to show note';
			}
		},
		created() {
			this.modalNote = {
				_id: this.note._id,
				title: this.note.title,
				body: this.note.body,
				label: this.label
			};
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.note-content {
		position: relative;

		&-head {
			border-bottom: 1px solid $accent-color;
		}

		&__header {
			cursor: pointer;
			// position: relative;
			width: 90%;
		}

		&__title {
			font-size: 1.2rem;
			color: greenyellow;
			text-align: center;
		}

		&__date {
			color: $accent-color;
			font-size: 0.8rem;
			text-align: left;
			margin: 0px;
			padding: 3px;
			display: inline-block;
			width: 50%;
		}

		&__label {
			text-align: right;
			margin: 0px;
			display: inline-block;
			width: 40%;
			color: yellowgreen;
			font-size: 0.8rem;
		}

		&__select {
			margin: 1px;
			padding: 1px;
			display: inline-block;
			font-size: 0.8rem;
			border: 1px solid $accent-color;
			border-radius: 1px;
		}

		&__body {
			cursor: pointer;
			// position: relative;
			height: 10rem;
			border-top: 1px solid $accent-color;
			overflow: auto;
			text-overflow: ellipsis;
			margin: 0;
			padding: 1px;
			white-space: pre;
			text-align: left;
			background-color: $note-background;
			// height: 4rem;
		}
	}

	.close-general {
		// float: right;
		position: absolute;
		right: 0.4rem;
		top: 0.6rem;
	}

	.edit-note-form {
		text-align: center;
		margin: auto;
		width: 80%;

		&__title {
			font-size: 1.1rem;
			width: 12rem;
			margin: 5px auto 2px;
			max-width: 90%;
		}

		&__label {
			font-size: 1.0rem;
			width: 6rem;
			max-width: 90%;
			margin: 2px;
		}

		&__text {
			width: 100%;
		}
	}

	.confirm-box {
		text-align: center;
		background: $secondary-color;
		padding: 1rem 0;

		&__text {
			color: $accent-color;
		}
	}

	/* Tooltip text */
	.note-tooltip {
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
		width: 50%;
		left: 50%;
	}
	/* Show the tooltip text when you mouse over the tooltip container */
	.note-content__header:hover .note-tooltip {
		display: block;
		top: -1rem;
	}
	.note-content__body:hover .note-tooltip {
		display: block;
		bottom: -1rem;
	}
	.close-general:hover .note-tooltip {
		display: block;
		bottom: 1rem;
		left: -2rem;
		width: auto;
	}
</style>
