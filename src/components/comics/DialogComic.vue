<template>
	<v-dialog v-model="visible" scrollable @keydown.esc="visible = false">
		<v-card height="100%">
			<v-card-title class="headline">
				{{comic.title}}
			</v-card-title>

			<v-row no-gutters>
				<v-col cols="12" md="6">
					<v-img contain :src="getImgSrc(comic, 'detail')" :lazy-src="getImgSrc(comic, 'portrait_small')" height="65vh">
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
							</v-row>
						</template>
					</v-img>
				</v-col>
				<v-col cols="12" md="6">
					<v-card-text>
						{{comic.description}}
					</v-card-text>
				</v-col>
			</v-row>
			
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="visible = false">OK</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'CardComic',

	data: () => ({
		visible: false,
		comic: {}
	}),

	methods: {
		show(comic) {
			this.comic = comic;

			this.visible = true;
		},

		getImgSrc(comic, type = 'detail') {
			if (!comic || !comic.thumbnail) return '';

			return `${comic.thumbnail.path}/${type}.${comic.thumbnail.extension}`;
		},
	}
}
</script>