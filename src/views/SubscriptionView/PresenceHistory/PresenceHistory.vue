<script setup>
import { onMounted, ref, watch } from 'vue';
import { $get } from '../../../utils/http';
import { appPresenceViewMode } from '../../../config';
import DefaultView from './DefaultView.vue';
import DetailedView from './DetailedView.vue';
import { createToast } from '../../../utils/toast';

const props = defineProps({
   subsId: Number,
   limit: Number,
});
const records = ref([]);
const viewMode = ref('');

watch(() => props.limit, function() {
   fetchPresenceRecords();
});

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
         records.value = response.result;
      } else {
         throw new Error('Invalid response');
      }
   } catch (error) {
      createToast('error', error.message);
   }
}

onMounted(function () {
   fetchPresenceRecords();
   viewMode.value = appPresenceViewMode();
});
</script>

<template>
   <DefaultView 
      v-if="viewMode === 'default'" 
      :records="records" />

   <DetailedView 
      v-if="viewMode === 'detailed'" 
      :records="records" />
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
</style>
