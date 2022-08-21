// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SettingsView from '../views/SettingsView/SettingsView.vue';
import AddSubscriptionView from '../views/AddSubscription.vue';
import WAManageView from '../views/WAManageView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            path: '/add',
            name: 'AddSubscription',
            component: AddSubscriptionView,
        },
        {
            path: '/wa',
            name: 'WAManager',
            component: WAManageView,
        }
    ],
});

export default router;
