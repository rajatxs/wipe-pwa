<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { fetchSubscription, deleteSubscription, changeSubscriptionNotification } from '../api/subs';
import { fetchPresenceRecords } from '../api/presence';
import LoaderView from '../components/LoaderView.vue';
import TrashIcon from '../icons/trash.vue';
import NotificationIcon from '../icons/notification.vue';
import NotificationOffIcon from '../icons/notification-off.vue';
import IconButton from '../components/IconButton.vue';

const route = useRoute();
const router = useRouter();
const subId = ref(Number(route.params.id));
const limit = ref(50);

const { isLoading: isLoadingSub, data: sub, refetch: refetchSub } = useQuery({
    queryKey: ['subs', subId.value],
    queryFn: () => fetchSubscription(subId.value),
    refetchInterval: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
});

const { data: records, refetch: refetchRecords, isFetched: isRecordFetched } = useQuery({
    queryKey: ['presence_history', subId.value],
    queryFn: () => fetchPresenceRecords(subId.value, limit.value),
    initialData: [],
});

const { mutate: mutateChangeNotificationSetting } = useMutation({
    mutationFn: changeSubscriptionNotification,
    onSuccess: refetchSub,
    onError() {
        alert('Unable to update subscription notification setting');
    },
});

const { mutate: mutateDeleteSubscription } = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: refetchSub,
    onError() {
        alert('Unable to delete subscription');
    },
});

function handleDeleteSubscription() {
    const permission = confirm('Are you sure you want to delete this subscription?');
    if (permission) {
        mutateDeleteSubscription(subId.value);
        router.replace('/');
    }
}

watch(limit, refetchRecords);
</script>

<template>
    <div class="pb-36">
        <div v-for="record in records" :key="record['id']" class="presence-record presence-detailed-record">
            <div class="left">
                <span>{{ moment(record.timestamp, false).format('L LT') }}</span>
            </div>

            <div class="center">
                <span>&hyphen;</span>
            </div>

            <div class="right">
                <span v-if="record.status" class="text-emerald-500">online</span>
                <span v-else class="text-neutral-500">offline</span>
            </div>
        </div>

        <template v-if="isRecordFetched">
            <div v-if="records.length > 0" class="w-48 mt-3 mx-auto">
                <button class="app-button" @click="limit += 50">Show more records</button>
            </div>
            <div v-else class="p-16 text-center font-medium">
                No records
            </div>
        </template>
        <div v-else>
            <LoaderView />
        </div>
    </div>

    <footer v-if="sub" class="presence-view-toolbar">
        <div class="app-container flex flex-row justify-between items-center h-full mx-auto px-5">
            <IconButton size="medium" title="Toggle notifications"
                @click="mutateChangeNotificationSetting({ id: subId, notify: !sub.notify })">
                <NotificationOffIcon v-if="sub.notify" />
                <NotificationIcon v-else />
            </IconButton>
            <div>
                <span v-if="isLoadingSub">...</span>
                <span v-else>{{ sub.alias }}</span>
            </div>
            <IconButton size="medium" @click="handleDeleteSubscription">
                <TrashIcon />
            </IconButton>
        </div>
    </footer>
</template>

<style>
.presence-record {
    @apply flex flex-row justify-between items-center px-8 h-14 border-b border-neutral-200 dark:border-neutral-700;
}

.presence-view-toolbar {
    @apply fixed left-0 right-0 bottom-0 h-16 backdrop-blur-md border-t border-neutral-200 bg-white/80 dark:bg-neutral-800/80 dark:border-neutral-700;
}
</style>
