<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $get } from '../../utils/http';
import { createToast } from '../../utils/toast';
import PresenceHistory from './PresenceHistory/PresenceHistory.vue';
import SubscriptionActions from './SubscriptionActions.vue';

const route = useRoute();
const subs = ref(null);
const router = useRouter();
const subid = ref(Number(route.params.id));
const limit = ref(16);

async function fetchSubscriptionInfo() {
   try {
      const resp = await $get('/subs/' + subid.value);
      subs.value = resp.result;
   } catch (error) {
      createToast('error', "Couldn't get subscription info");
   }
}

onMounted(async () => {
   await fetchSubscriptionInfo();
})
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
         v-if="subs" 
         :subs-info="subs"
         @delete="router.push('/')"
         @update="fetchSubscriptionInfo" />
   </div>
</template>

<style>
.history-loader {
   display: flex;
   padding: 12px 0;
   height: 120px;
   justify-content: center;
}
</style>
