<template>
	<div>
		<v-card 
			height="100%" 
			min-width="20vw"
			class="d-flex flex-column card-comic justify-center align-center"
			:elevation="0"
			color="transparent"
			@click="$emit('click', comic)"
			align="center"
			justify="center"
		>
			<v-card-title class="subtitle-2">
				{{comic.title}}
			</v-card-title>

			<v-img :src="getImgSrc(comic, 'portrait_xlarge')" contain max-height="255px">
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
			</v-img>

			<v-card-text class="text--secondary font-weight-light text-center">
				{{getCreators(comic)}}
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'CardComic',

	props: [
		'comic'
	],

	data: () => ({
		dialog: false,
		comicDialog: {},
	}),

	methods: {
		getCreators(comic) {
			if (!comic || !comic.creators || !comic.creators.items) return '';

			return comic.creators.items.map(c => c.name).join(', ');
		},
		
		getImgSrc(comic, type = 'detail') {
			if (!comic || !comic.thumbnail) return '';

			return `${comic.thumbnail.path}/${type}.${comic.thumbnail.extension}`;
		},

		openComic(comic) {
			this.$emit('click', comic);
		}
	}
}
</script>

<style scoped>
.card-comic {
	cursor: pointer;
}
</style>