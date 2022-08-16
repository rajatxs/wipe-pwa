// @ts-nocheck
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Button from './components/Button.vue';
import IconButton from './components/IconButton.vue';
import Switch from './components/Switch.vue';

import './assets/main.css';

const app = createApp(App);
app.component('app-button', Button);
app.component('app-icon-button', IconButton);
app.component('app-switch', Switch);

app.use(router);
app.mount('#app');
