<template>
	<v-autocomplete
		v-model="selectedCharacters"
		:items="characters"
		@change="callChange()"
		:search-input.sync="searchCharacters"
		label="Busca por personagens..."
		item-text="name"
		item-value="id"
		return-object
		chips
		deletable-chips
		multiple
		:loading="loadingCharacters"
		:no-data-text="loadingCharacters ? 'Buscando...' : !searchCharacters ? 'Digite algo para buscar...' : 'Nenhum resultado encontrado'"
		no-filter
		:menu-props="{closeOnContentClick: true}"
	/>
</template>

<script>
export default {
	name: 'AutocompleteCharacters',

	data: () => ({
		loadingCharacters: false,
		characters: [],
		searchCharacters: '',
		selectedCharacters: []
	}),

	watch: {
    	searchCharacters (text) {	
			this.loadCharacters(text)
		}
	},

	methods: {
		loadCharacters(text){
			this.loadingCharacters = true;

			const params = {
				nameStartsWith: text || undefined
			};

			this.$http
				.get('characters', { params })
				.then((response) => {
					this.characters = [...response.body.data.results, ...this.selectedCharacters];
				}).finally(() => {
					this.loadingCharacters = false;
				});
		},

		callChange(){
			this.$emit('changeData', this.selectedCharacters);
		}
	}
}
</script>