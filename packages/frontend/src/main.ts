import './assets/base.css';
import 'primeicons/primeicons.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: false || 'none',
		}
	}
});
app.use(router);

app.mount('#app');
router.push('/');
