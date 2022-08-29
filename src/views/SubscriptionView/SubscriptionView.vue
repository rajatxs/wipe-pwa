<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PresenceHistory from './PresenceHistory.vue';
import SubscriptionActions from './SubscriptionActions.vue';

const route = useRoute();
const router = useRouter();
const subid = ref(Number(route.params.id));
const limit = ref(16);
</script>

<template>
   <div class="app-presence-records">
      <PresenceHistory 
         :subs-id="subid" 
         :limit="limit" />
      <div class="history-loader">
         <app-button @click="limit += 16">...</app-button>
      </div>
      <SubscriptionActions 
         :subs-id="subid"
         @delete="router.push('/')" />
   </div>
</template>

<style>
.presence-record {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding-left: 1.5rem;
   padding-right: 1.5rem;
   height: 56px;
   border-bottom: 1px solid var(--accents-2);
}
.presence-duration {
   margin: 0;
   font-size: 18.5px;
   line-height: 1rem;
   font-weight: 500;
}
.presence-lastseen {
   font-weight: 300;
   font-size: 14px;
   color: var(--accents-6);
}
.subs-actions {
   display: flex;
   justify-content: center;
}
.history-loader {
   display: flex;
   padding: 12px 0;
   height: 120px;
   justify-content: center;
}
</style>
