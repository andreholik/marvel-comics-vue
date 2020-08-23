<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="6">
				<autocomplete-characters @changeData="changeSelectedCharacters"/>
			</v-col>	
		</v-row>

		<v-row v-if="loading">
			<v-col cols="4" v-for="(item, i) in 20" :key="i">
				<v-skeleton-loader class="mx-auto" type="card"/>
			</v-col>
		</v-row>

		<v-row v-if="!loading && comics.length">
			<v-col v-for="comic in comics"  :key="comic.id">
				<card-comic :comic="comic" @click="openComic(comic)"/>
			</v-col>
		</v-row>

		<v-row v-if="!loading && (!comics || !comics.length)">
			Nenhum resultado encontrado!
		</v-row>

		<div class="text-center pa-6" v-if="!loading && pagination.totalPages > 1">
			<v-pagination
				v-model="pagination.page"
				:length="pagination.totalPages"
				:total-visible="6"
				circle
				@input="loadComics"
			/>
		</div>

		<dialog-comic ref="dialogComic"/>
	</v-container>
</template>

<script>
import AutocompleteCharacters from '../characters/AutocompleteCharacters';
import CardComic from '../comics/CardComic';
import DialogComic from '../comics/DialogComic';

export default {
	name: 'ListComics',
	
	components: {
		AutocompleteCharacters,
		CardComic,
		DialogComic
	},

    data: () => ({
		selectedCharacters: [],
		comics: [],
		pagination: {
			page: 1,
			itemsPerPage: 10,
			totalPages: 0,
		},
		loading: true,
	}),

	mounted() {
		this.loadComics();
	},

	methods: {
		loadComics() {
			window.scroll({top: 0, left: 0, behavior: 'smooth' });

			this.loading = true;

			const params = {
				limit: this.itemsPerPage,
				offset:  this.itemsPerPage * (this.page - 1),
				characters: this.selectedCharacters.map(c => c.id) || undefined,
				orderBy: 'title'
			};

			this.$http
				.get('comics', { params }).then((response) => {
					this.pagination.totalPages = Math.trunc((response.body.data.total / this.pagination.itemsPerPage));
					this.comics = response.body.data.results;
				}).finally(() => {
					this.loading = false;
				});
		},

		openComic(comic) {
			this.$http
				.get(comic.resourceURI)
				.then((response) => {
					this.$refs.dialogComic.show(response.body.data.results[0]);
				});
		},		

		searchComic() {
			this.pagination.page = 1;

			this.loadComics();
		},

		changeSelectedCharacters(selectedCharacters) {
			this.selectedCharacters = selectedCharacters;

			this.loadComics();
		},
	},
  }
</script>
