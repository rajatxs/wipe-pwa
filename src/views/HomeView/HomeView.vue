<script setup>
import { RouterLink } from 'vue-router';
import { useQuery, useMutation } from '@tanstack/vue-query';
import LoaderView from '../../components/LoaderView.vue';
import { fetchSubscriptions, changeSubscriptionStatus } from '../../api/subs';
import SubscriptionStatus from './SubscriptionStatus.vue';
import BellIcon from '../../assets/icons/bell.vue';
import Switch from '../../components/Switch.vue';
import { avatarUrl } from '../../utils/common';

const {
    isLoading,
    data: subs,
    refetch,
    error,
} = useQuery({
    enabled: true,
    queryKey: ['subs'],
    queryFn: fetchSubscriptions,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: false,
});

const toggleStatusMutation = useMutation({
    mutationFn: changeSubscriptionStatus,
    onSuccess: refetch,
    onError() {
        alert('Unable to update subscription status');
    },
});
</script>

<template>
    <LoaderView v-if="isLoading" message="Loading" />
    <div v-else-if="subs" class="flex flex-col py-5 w-full gap-2">
        <div v-for="sub in subs" :key="sub.id" class="subs-item">
            <RouterLink class="subs-router-link hover:bg-neutral-100" :to="`/subs/${sub.id}`">
                <div class="relative w-12 h-12">
                    <img
                        :src="avatarUrl(sub.alias)"
                        :alt="sub.alias"
                        :title="sub.alias"
                        width="46"
                        height="46"
                        class="rounded-full" />
                    <BellIcon v-if="sub.notify" class="subs-alert-badge" />
                </div>
                <div class="flex flex-col gap-1">
                    <div class="font-medium leading-5">{{ sub.alias }}</div>
                    <SubscriptionStatus
                        :show="sub.enabled"
                        :sub-id="sub.id"
                        :fallback="sub.phone" />
                </div>
            </RouterLink>
            <div class="w-[20%] flex items-center pr-5 h-12">
                <Switch
                    :id="`sub-switch-${sub.id}`"
                    :value="sub.enabled"
                    @value="toggleStatusMutation.mutate({ id: sub.id, enabled: $event })" />
            </div>
        </div>
    </div>
    <div v-else-if="error" class="h-3/5 flex flex-col items-center justify-center">
        <h3 class="font-medium text-neutral-500">Something went wrong</h3>
    </div>
    <div v-else class="h-3/5 flex flex-col items-center justify-center">
        <h3 class="font-medium text-neutral-500">No subscriptions</h3>
    </div>
</template>

<style>
.subs-item {
    @apply flex w-full h-16 justify-between items-center;
}

.subs-router-link {
    @apply flex items-center h-full gap-2 w-[80%] px-5 rounded-md transition-colors;
}

.subs-alert-badge {
    @apply absolute w-5 h-5 top-[-3px] right-[-3px] p-1 bg-neutral-200 fill-neutral-500 rounded-full;
}
</style>
