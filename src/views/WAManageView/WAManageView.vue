<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import ServiceStatus from './ServiceStatus.vue';
import SessionOperation from './SessionOperation.vue';
import ServiceAction from './ServiceAction.vue';
import { $get } from '../../utils/http';
import { createToast } from '../../utils/toast';
import { getValue } from '../../utils/store';
import { WA_SERVICE_RESTART_TS_KEY } from '../../config';

const status = ref(false);
const timer = ref(null);
const loading = ref(false);
const restartedTimestamp = ref(null);

async function fetchServiceStatus() {
   try {
      const response = await $get('/wa-socket/status');
      status.value = response.result.opened;
   } catch (error) {
      createToast('error', error.message);
      unregisterStatusInterval();
   }
}

function loadLastRestartedTime() {
   const localRestartTimestamp = getValue(WA_SERVICE_RESTART_TS_KEY);

   if (!localRestartTimestamp) {
      if (!restartedTimestamp.value) {
         restartedTimestamp.value = null;
      }
      return;
   }

   restartedTimestamp.value = moment(Number(localRestartTimestamp), true).fromNow(false);
}

function registerStatusInterval() {
   if (!timer.value) {
      timer.value = setInterval(() => {
         loadLastRestartedTime();
         fetchServiceStatus();
      }, 2000);
   }
}

function unregisterStatusInterval() {
   if (timer.value) {
      clearInterval(timer.value);
   }
}

onMounted(async function () {
   loading.value = true;
   loadLastRestartedTime();
   await fetchServiceStatus();
   loading.value = false;
   registerStatusInterval();
});

onUnmounted(function () {
   unregisterStatusInterval();
});
</script>

<template>
   <ServiceStatus 
      :status="status" 
      :loading="loading"
      :last-restarted-time="restartedTimestamp" />
   <hr class="status-divider" />
   <SessionOperation />
   <ServiceAction :status="status" />
</template>

<style>
.status-divider {
   border-top: 1px solid var(--accents-2);
}
</style>
