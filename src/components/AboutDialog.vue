<script setup>
import { useQuery } from '@tanstack/vue-query';
import { fetchServerInfo } from '../api/common';
import Dialog from './Dialog.vue';
import store from '../utils/store';
import packageJson from '../../package.json';

const version = packageJson.version;
const serverUrl = store.serverUrl;
const tag = store.tag;
const userAgent = window.navigator.userAgent;
const { data: serverInfo } = useQuery({
    queryKey: ['server_info'],
    queryFn: fetchServerInfo,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
});
</script>

<template>
    <Dialog title="About">
        <div class="flex flex-col gap-3 max-h-screen overflow-y-auto">
            <!-- Version -->
            <div class="app-info-item" id="version-info">
                <h5 class="app-info-item__title">Version</h5>
                <span class="app-info-item__desc">{{ version }}</span>
            </div>

            <!-- Server URL -->
            <div class="app-info-item" id="serverUrl-info">
                <h5 class="app-info-item__title">Server URL</h5>
                <span class="app-info-item__desc">{{ serverUrl }}</span>
            </div>

            <!-- Server version -->
            <div class="app-info-item" id="serverVersion-info">
                <h5 class="app-info-item__title">Server Version</h5>
                <span class="app-info-item__desc">{{ serverInfo ? serverInfo.version : '...' }}</span>
            </div>
            
            <!-- Server mode -->
            <div class="app-info-item" id="serverMode-info">
                <h5 class="app-info-item__title">Server Mode</h5>
                <span class="app-info-item__desc">{{ serverInfo ? serverInfo.mode : '...' }}</span>
            </div>

            <!-- Tag -->
            <div class="app-info-item" id="tag-info">
                <h5 class="app-info-item__title">Tag</h5>
                <span class="app-info-item__desc">{{ tag }}</span>
            </div>

            <!-- User Agent -->
            <div class="app-info-item" id="userAgent-info">
                <h5 class="app-info-item__title">User Agent</h5>
                <span class="app-info-item__desc">{{ userAgent }}</span>
            </div>
        </div>
    </Dialog>
</template>

<style>
.app-info-item {
    @apply flex flex-col justify-center p-3 border rounded-lg border-neutral-200 dark:border-neutral-700;
}

.app-info-item__title {
    @apply font-medium;
}

.app-info-item__desc {
    @apply text-sm text-neutral-500 dark:text-neutral-400;
}
</style>
