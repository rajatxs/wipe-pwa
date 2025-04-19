<script setup>
import { useRouter } from 'vue-router';
import appState from '../state';
import store from '../utils/store';

const router = useRouter();

function clearData() {
    // TODO: Include storage clearing operations
}

function logout() {
    const permission = confirm('Are you sure you want to logout?');
    if (permission) {
        store.serverUrl = '';
        store.token = '';
        appState.auth = false;
        router.replace('/');
    }
}
</script>

<template>
    <div class="settings-view flex flex-col p-5 gap-3">
        <div class="app-setting-item" role="button" id="clear-data-setting" @click="clearData">
            <h5 class="app-setting-item__title">Clear data</h5>
            <span class="app-setting-item__desc">Clear saved data from the browser</span>
        </div>
        <div class="app-setting-item" role="button" id="logout-setting" @click="logout">
            <h5 class="app-setting-item__title">Logout</h5>
            <span class="app-setting-item__desc">Logout from the current session</span>
        </div>
    </div>
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
