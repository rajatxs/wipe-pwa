// @ts-nocheck
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Button from './components/Button.vue';
import IconButton from './components/IconButton.vue';
import Switch from './components/Switch.vue';
import Loader from './components/Loader.vue';

import './assets/main.css';
import './assets/custom.css';

const app = createApp(App);
app.component('app-button', Button);
app.component('app-icon-button', IconButton);
app.component('app-switch', Switch);
app.component('app-loader', Loader);

app.use(router);
app.mount('#app');
