<template>
	<v-app>
		<v-main>
			<ListComics/>
    	</v-main>
	</v-app>
</template>

<script>
import ListComics from './components/comics/ListComics';

export default {
	name: 'App',

	components: {
		ListComics,
	},

	data: () => ({
	//
	}),
};
</script>
