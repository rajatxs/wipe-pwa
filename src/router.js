import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/Home.vue';
import SettingsView from './views/SettingsView/SettingsView.vue';
import AddSubscriptionView from './views/AddSubscription.vue';
import WAManageView from './views/WAManageView/WAManageView.vue';
import SubscriptionView from './views/SubscriptionView/SubscriptionView.vue';

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
            path: '/add',
            name: 'AddSubscription',
            component: AddSubscriptionView,
        },
        {
            path: '/wa',
            name: 'WAManager',
            component: WAManageView,
        },
        {
            path: '/subs/:id',
            name: 'Subscription',
            component: SubscriptionView,
        },
    ],
});

export default router;
