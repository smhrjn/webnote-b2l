<template>
	<card class="note-content">
		<div @click.stop="toggleBody">
			<div class="note-content__title">{{ note.title }}<button @click.stop="onDelete" class="button-general close-general">X</button></div>
			<div class="note-content__date">{{ note.date | formatDate('LL') }}</div>
		</div>
		<div class="note-content__body" v-show="showBody">{{ note.body }}</div>
	</card>
</template>

<script>
	import card from '../components/Card.vue';
	import notesApi from '../api/notes-api';
	export default {
		name: 'note',
		components: { card },
		props: ['note'],
		data() {
			return {
				showBody: false
			};
		},
		computed: {

		},
		methods: {
			onDelete() {
				notesApi.deleteNote(this, this.note._id);
			},
			toggleBody() {
				this.showBody = !this.showBody;
			}
		}
	};
</script>

<style lang="scss">
	@import "~styles/variables.scss";

	.note-content {
		cursor: pointer;

		&__title {
			font-size: 1.2rem;
			color: greenyellow;
			text-align: center;
		}

		&__date {
			font-size: 0.6rem;
			text-align: left;
			margin: 0px;
			padding: 3px;
			border-bottom: 1px solid $accent-color;
		}

		&__body {
			height: 10rem;
			border-top: 1px solid $accent-color;
			overflow: auto;
			text-overflow: ellipsis;
			margin: 0;
			padding: 3px;
			white-space: pre;
			text-align: left;
			background-color: #BAA378;
			// height: 4rem;
		}
	}
</style>
