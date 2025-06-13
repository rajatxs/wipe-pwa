<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import appState from '../state';
import store from '../utils/store';
import AboutDialog from '../components/AboutDialog.vue';
import Switch from '../components/Switch.vue';

const router = useRouter();
const viewAboutDialog = ref(false);

/** Sets view all subscriptions event */
function setViewAllSubscriptions(value) {
    store.viewAllSubscriptions = value;
    appState.viewAllSubscriptions = value;
}

/** Clears saved data from the browser */
function clearData() {
    store.clearCache();
}

/** Logs out the user */
function logout() {
    const permission = confirm('Are you sure you want to logout?');

    if (permission) {
        store.serverUrl = '';
        store.token = '';
        appState.auth = false;
        store.clearCache();
        router.replace('/');
    }
}
</script>

<template>
    <div class="settings-view flex flex-col p-5 gap-3">
        <div class="app-setting-item flex flex-row justify-between items-center" role="button" id="clear-data-setting">
            <div>
                <h5 class="app-setting-item__title">Show all subscriptions</h5>
                <span class="app-setting-item__desc">
                    Show all subscriptions, including disabled ones and other events
                </span>
            </div>
            <Switch
                id="settings-show-all-subs"
                :value="appState.viewAllSubscriptions"
                @value="setViewAllSubscriptions" />
        </div>
        <div class="app-setting-item" role="button" id="clear-data-setting" @click="clearData">
            <h5 class="app-setting-item__title">Clear cache</h5>
            <span class="app-setting-item__desc">Clear saved data from the browser</span>
        </div>
        <div class="app-setting-item" role="button" id="about-setting" @click="viewAboutDialog = true">
            <h5 class="app-setting-item__title">About</h5>
            <span class="app-setting-item__desc">App version and other information</span>
        </div>
        <div class="app-setting-item" role="button" id="logout-setting" @click="logout">
            <h5 class="app-setting-item__title">Logout</h5>
            <span class="app-setting-item__desc">Logout from the current session</span>
        </div>
    </div>
    <AboutDialog v-if="viewAboutDialog" @close="viewAboutDialog = false" />
</template>

<style>
.app-setting-item {
    @apply flex flex-col justify-center p-3 cursor-pointer border rounded-lg border-neutral-200 dark:border-neutral-700;
}

.app-setting-item:hover {
    @apply bg-neutral-100 dark:bg-neutral-800;
}

.app-setting-item__title {
    @apply font-medium;
}

.app-setting-item__desc {
    @apply text-sm text-neutral-500 dark:text-neutral-400;
}
</style>
