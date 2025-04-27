import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/Home.vue';
import SettingsView from './views/Settings.vue';
import PresenceView from './views/Presense.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
        },
        {
            path: '/subs/:id',
            name: 'Subscription',
            component: PresenceView,
        },
    ],
});

export default router;
