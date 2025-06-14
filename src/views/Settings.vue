<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import appState from '../state';
import store from '../utils/store';
import { fetchDatabaseBackupFile } from '../api/common';
import AboutDialog from '../components/AboutDialog.vue';
import Switch from '../components/Switch.vue';

const router = useRouter();
const downloadingBackup = ref(false);
const viewAboutDialog = ref(false);

/** Sets view all subscriptions event */
function setViewAllSubscriptions(value) {
    store.viewAllSubscriptions = value;
    appState.viewAllSubscriptions = value;
}

/** Downloads the database backup file */
async function downloadBackup() {
    downloadingBackup.value = true;

    try {
        const blob = await fetchDatabaseBackupFile();
        const url = window.URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `Wipe Backup - ${moment().format('DD MMM YYYY')}.db`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        alert('Unable to download backup');
    }

    downloadingBackup.value = false;
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
        <!-- Show all subscriptions -->
        <div class="app-setting-item flex flex-row justify-between items-center" role="button" id="clear-data-setting">
            <div>
                <h5 class="app-setting-item__title">Show all subscriptions</h5>
                <p class="app-setting-item__desc">
                    Show all subscriptions, including disabled ones and other events
                </p>
            </div>
            <Switch
                id="settings-show-all-subs"
                :value="appState.viewAllSubscriptions"
                @value="setViewAllSubscriptions" />
        </div>

        <!-- Download backup -->
        <button
            class="app-setting-item"
            id="download-backup-setting"
            :disabled="downloadingBackup"
            @click="downloadBackup">
            <h5 class="app-setting-item__title">
                {{ downloadingBackup ? 'Downloading backup...' : 'Download backup' }}
            </h5>
            <p class="app-setting-item__desc">Download a database backup of all application data</p>
        </button>

        <!-- Clear cache -->
        <button class="app-setting-item" id="clear-data-setting" @click="clearData">
            <h5 class="app-setting-item__title">Clear cache</h5>
            <p class="app-setting-item__desc">Clear saved data from the browser</p>
        </button>

        <!-- About -->
        <button class="app-setting-item" id="about-setting" @click="viewAboutDialog = true">
            <h5 class="app-setting-item__title">About</h5>
            <p class="app-setting-item__desc">App version and other information</p>
        </button>

        <!-- Logout -->
        <button class="app-setting-item" role="button" id="logout-setting" @click="logout">
            <h5 class="app-setting-item__title">Logout</h5>
            <p class="app-setting-item__desc">Logout from the current session</p>
        </button>
    </div>

    <AboutDialog v-if="viewAboutDialog" @close="viewAboutDialog = false" />
</template>

<style>
.app-setting-item {
    @apply flex flex-col justify-center items-start p-3 cursor-pointer border rounded-lg border-neutral-200 disabled:pointer-events-none disabled:opacity-50 active:bg-neutral-100 md:hover:bg-neutral-100 dark:border-neutral-700 dark:active:bg-neutral-800 md:dark:hover:bg-neutral-800;
}

.app-setting-item__title {
    @apply font-medium;
}

.app-setting-item__desc {
    @apply text-sm text-left text-neutral-500 dark:text-neutral-400;
}
</style>
