<script setup>
import { useQuery } from '@tanstack/vue-query';
import Dialog from './Dialog.vue';
import HDDIcon from '../assets/icons/hdd-fill.vue';
import { fetchServerStatus, startWAServer, stopWAServer } from '../api/common';
import { getReadableTime } from '../utils/common';

const { isLoading, isFetched, data, refetch } = useQuery({
    queryKey: ['wa_state'],
    queryFn: fetchServerStatus,
    refetchInterval: 3000,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
});

function start() {
    startWAServer().then(refetch);
}

function stop() {
    stopWAServer().then(refetch);
}
</script>

<template>
    <Dialog title="WA Service">
        <div class="flex flex-col h-48 justify-center items-center">
            <HDDIcon :class="data && data.active ? 'server-status__online' : 'server-status__offline'" />
            <p v-if="isFetched" class="leading-5">
                <small v-if="isLoading">...</small>
                <small v-else-if="data.lastRestarted">Last restarted {{ getReadableTime(data.lastRestarted) }}</small>
                <small v-else>Not running</small>
            </p>
        </div>

        <div v-if="isFetched" class="flex justify-between gap-3">
            <button v-if="data.active" class="app-button" @click="stop">Stop</button>
            <button v-else class="app-button" @click="start">Start</button>
        </div>
    </Dialog>
</template>

<style>
.server-status__online {
    @apply w-24 h-24 fill-emerald-500 transition;
}

.server-status__offline {
    @apply w-24 h-24 fill-neutral-600 transition;
}
</style>
