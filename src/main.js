import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import CryptoJS from 'crypto-js';

Vue.config.productionTip = false

Vue.use(VueResource);

Vue.http.options.root = process.env.VUE_APP_API_ENDPOINT;

Vue.http.interceptors.push((request, next) => {
	const apiKey = process.env.VUE_APP_API_PUBLIC_KEY;
	const privateKey = process.env.VUE_APP_API_PRIVATE_KEY;

	const ts = new Date().getTime().toString();

	request.params['apikey'] = apiKey;
	request.params['ts'] = ts;
	request.params['hash'] = CryptoJS.MD5(`${ts}${privateKey}${apiKey}`).toString();

	next();
})

new Vue({
	vuetify,
	render: h => h(App)
}).$mount('#app')
