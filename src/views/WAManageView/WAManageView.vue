<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ServiceStatus from './ServiceStatus.vue';
import SessionOperation from './SessionOperation.vue';
import ServiceAction from './ServiceAction.vue';
import { $get } from '../../utils/http';
import { createToast } from '../../utils/toast';

const status = ref(false);
const timer = ref(null);

async function fetchServiceStatus() {
   try {
      const response = await $get('/wa-socket/status');
      status.value = response.result.opened;
   } catch (error) {
      createToast('error', error.message);
      unregisterStatusInterval();
   }
}

function registerStatusInterval() {
   if (!timer.value) {
      timer.value = setInterval(() => {
         fetchServiceStatus();
      }, 2000);
   }
}

function unregisterStatusInterval() {
   if (timer.value) {
      clearInterval(timer.value);
   }
}

onMounted(function() {
   fetchServiceStatus();
   registerStatusInterval();
});

onUnmounted(function() {
   unregisterStatusInterval();
});
</script>

<template>
   <ServiceStatus :status="status" />
   <SessionOperation />
   <ServiceAction :status="status" />
</template>
