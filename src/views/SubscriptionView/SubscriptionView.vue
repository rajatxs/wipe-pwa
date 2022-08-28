<script setup>
import { ref, onMounted } from 'vue';
import { $get } from '../../utils/http';
import { createToast } from '../../utils/toast';

const subid = ref(4);
const limit = ref(25);
const presenceRecords = ref([]);
const loaded = ref(false);

// const chunkSize = 10;
// for (let i = 0; i < array.length; i += chunkSize) {
//    const chunk = array.slice(i, i + chunkSize);
//    // do whatever
// }

async function fetchPresenceRecords() {
   let records = [];
   try {
      const response = await $get(
         '/presence',
         {},
         {
            subid: subid.value,
            limit: limit.value,
         }
      );

      if (Array.isArray(response.result)) {
         // sort record by timestamp
         records = Array.from(response.result);
         records = records.sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts));
         // console.log(records);
         presenceRecords.value = records;
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
   <div class="app-presence-records">
      <div
         v-for="presence in presenceRecords"
         :key="presence.id"
         class="presence-record">
         <div class="left">
            <h4 class="presence-duration">3 minutes</h4>
         </div>
         <div class="right">
            <span class="presence-lastseen">2:40 PM</span>
         </div>
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
