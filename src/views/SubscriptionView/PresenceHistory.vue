<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';
import moment from 'moment';
import { $get } from '../../utils/http';
import { createToast } from '../../utils/toast';

const props = defineProps({
   subsId: Number,
   limit: Number,
});
const presenceSlots = ref([]);

watch(() => props.limit, function() {
   fetchPresenceRecords();
});

/**
 * Compibes two presence record into single array element
 * @param {object[]} records 
 */
function organizePresenceSlots(records) {
   let slots = [];

   if (records.length % 2 !== 0) {
      records.pop();
   }

   // sort record by timestamp
   records = records.sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts));
   records.reduce((prev, curr) => {
      if (prev.status === 0 && curr.status === 1) {
         slots.push([prev, curr]);
      }
      return curr;
   }, records[0]);
   presenceSlots.value = slots;
}

async function fetchPresenceRecords() {
   try {
      const response = await $get(
         '/presence',
         {},
         {
            subid: props.subsId,
            limit: props.limit,
         }
      );

      if (Array.isArray(response.result)) {
         organizePresenceSlots(Array.from(response.result));
      } else {
         throw new Error('Invalid response');
      }
   } catch (error) {
      createToast('error', error.message);
   }
}

onMounted(function () {
   fetchPresenceRecords();
});
</script>

<template>
   <div
      v-for="slot in presenceSlots"
      :key="slot[0].id + slot[1].id"
      class="presence-record">
      <div class="left">
         <h4 class="presence-duration">
            {{ moment(slot[1].ts).from(slot[0].ts, true) }}
         </h4>
      </div>
      <div class="right">
         <span class="presence-lastseen">{{
            moment(slot[1].ts).calendar()
         }}</span>
      </div>
   </div>
</template>
