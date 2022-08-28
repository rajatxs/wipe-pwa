<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { $get, $put } from '../../utils/http';
import { createToast } from '../../utils/toast';
import NullResultView from '../../components/NullResultView.vue';
import LoaderView from '../../components/LoaderView.vue';
import SubscriptionStatus from './SubscriptionStatus.vue';
import { avatarUrl } from '../../utils/common';

const subscriptions = ref([]);
const loaded = ref(false);

/**
 * Handles update status for spcific subscription
 * @param {boolean} enabled
 * @param {number} id
 */
async function updateEnabledStatus(enabled, id) {
   let subsIndex;
   if (!id) {
      return;
   }

   try {
      const response = await $put('/subs/' + id, {}, { enabled });
      subsIndex = subscriptions.value.findIndex((subs) => subs.id === id);

      if (subsIndex !== -1) {
         subscriptions.value[subsIndex].enabled = enabled;
      }

      createToast('primary', response.message);
   } catch (error) {
      createToast('error', error.message);
   }
}

async function fetchAllSubscriptions() {
   if (loaded.value) {
      loaded.value = false;
   }

   try {
      const response = await $get('/subs');
      subscriptions.value = Array.from(response.result);
   } catch (error) {
      createToast('error', error.message);
   }
   loaded.value = true;
}

onMounted(function () {
   fetchAllSubscriptions();
});
</script>

<template>
   <div v-if="loaded && subscriptions.length > 0" class="app-subs-list-view">
      <div v-for="sub in subscriptions" :key="sub.id" class="subs-item">
         <RouterLink class="subs-router-link" :to="'/subs/' + sub.id">
            <div class="subs-icon">
               <img
                  :src="avatarUrl(sub.alias)"
                  :alt="sub.alias"
                  :title="sub.alias"
                  width="46"
                  height="46"
                  class="subs-icon-image"
               />
            </div>
            <div class="subs-details">
               <div class="subs-alias">{{ sub.alias }}</div>
               <SubscriptionStatus
                  :show="Boolean(sub.enabled)"
                  :sub-id="sub.id"
                  :fallback="sub.phone"
               />
            </div>
         </RouterLink>
         <div class="subs-action">
            <app-switch
               :id="'sub-switch-' + sub.id"
               :value="Boolean(sub.enabled)"
               @value="updateEnabledStatus($event, sub.id)"
            />
         </div>
      </div>
   </div>
   <LoaderView v-else-if="!loaded" message="Getting subscriptions" />
   <div v-else>
      <NullResultView
         height="370px"
         img="/img/no-data.svg"
         title="No subscriptions"
         desc="Tap on + icon to add one"
      />
   </div>
</template>

<style>
.app-subs-list-view {
   padding-top: 8px;
   padding-bottom: 12px;
   display: flex;
   flex-direction: column;
   width: 100%;
   gap: 8px;
}

.subs-item {
   display: flex;
   width: inherit;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
}

.subs-router-link {
   display: flex;
   align-items: center;
   height: 48px;
   gap: 18px;
   padding: 8px 1.5rem;
   width: calc(80% - 3rem);
   color: inherit;
   border-radius: var(--x-stack-edge-radius);
}

.subs-router-link:hover {
   background-color: var(--accents-1);
}

.subs-action {
   width: 20%;
   padding-right: 16px;
   height: 48px;
}

.subs-icon {
   width: 46px;
   height: 46px;
}

.subs-icon-image {
   border-radius: 50%;
}

.subs-details {
   display: flex;
   flex-direction: column;
   gap: 3.6px;
}

.subs-alias {
   font-size: 16px;
   font-weight: 500;
   line-height: 1.2rem;
}
</style>