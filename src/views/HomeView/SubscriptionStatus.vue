<script setup>
import { ref, watch, defineProps, onMounted, onUnmounted } from 'vue';
import { $get } from '../../utils/http';
import moment from 'moment';

const UPDATE_INTERVAL = 5000;
const id = ref(NaN);
const active = ref(false);
const timestamp = ref('');
const loading = ref(true);
const timer = ref(null);
const timeString = ref('');
const props = defineProps({
   show: Boolean,
   subId: Number,
   fallback: String,
});

async function fetchLastKnownPresence() {
   let record;

   try {
      const response = await $get(`/presence?subid=${props.subId}&limit=1`);

      if (Array.isArray(response.result)) {
         record = response.result[0];
      } else {
         record = response.result;
      }

      if (record) {
         id.value = record.id;
         active.value = Boolean(record.status);
         timestamp.value = record.ts;
         timeString.value = moment(record.ts, true)
            .startOf('minute')
            .fromNow(false);
      }
   } catch (error) {
      console.error("Couldn't get last seen", error);
   }

   loading.value = false;
}

function registerInterval() {
   if (timer.value) {
      return;
   }

   timer.value = setInterval(async () => {
      await fetchLastKnownPresence();
   }, UPDATE_INTERVAL);
}

function unregisterInterval() {
   if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
   }
}

watch(
   () => props.show,
   (value) => {
      if (value) {
         registerInterval();
      } else {
         unregisterInterval();
      }
   }
);

onUnmounted(function () {
   unregisterInterval();
});

onMounted(async function () {
   if (props.show) {
      await fetchLastKnownPresence();
      registerInterval();
   } else {
      loading.value = false;
   }
});
</script>

<template>
   <div class="app-subs-status">
      <template v-if="loading">...</template>
      <template v-else-if="active && show">online</template>
      <template v-else-if="timestamp && show">{{ timeString }}</template>
      <template v-else>{{ fallback }}</template>
   </div>
</template>

<style>
.app-subs-status {
   font-size: 12px;
   color: var(--accents-5);
}
</style>
