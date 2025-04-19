<script setup>
import { defineProps } from 'vue';
import moment from 'moment';
import { useQuery } from '@tanstack/vue-query';
import { fetchLastPresenceRecord } from '../api/presence';
import { getReadableTime } from '../utils/common';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    subId: {
        type: Number,
        required: true,
    },
    fallback: {
        type: String,
        default: '',
    },
});

const { isLoading, data: presence } = useQuery({
    enabled: props.show,
    queryKey: ['last_presence', props.subId],
    queryFn: () => fetchLastPresenceRecord(props.subId),
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: false,
});

/**
 * Returns a human readable time string from the current time
 * @param {string} date
 * @returns {string}
 */
function getTimedifference(date) {
    return moment(date, true).startOf('minutes').fromNow(true);
}
</script>

<template>
    <div class="text-xs text-neutral-500">
        <span v-if="isLoading">...</span>
        <template v-else-if="presence && props.show">
            <span v-if="presence.status">online &bull; {{ getTimedifference(presence.timestamp) }}</span>
            <span v-else>{{ getReadableTime(presence.timestamp) }}</span>
        </template>
        <span v-else>{{ fallback }}</span>
    </div>
</template>
