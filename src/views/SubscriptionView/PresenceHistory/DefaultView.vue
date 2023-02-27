<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import moment from 'moment';

const props = defineProps({
   records: Array,
});
const presenceSlots = ref([]);

watch(() => props.records, function() {
   organizePresenceSlots(props.records);
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

onMounted(function() {
   organizePresenceSlots(props.records);
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
</style>
