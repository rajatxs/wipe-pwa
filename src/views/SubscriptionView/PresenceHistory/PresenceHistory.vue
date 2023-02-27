<script setup>
import { onMounted, ref, watch } from 'vue';
import { $get } from '../../../utils/http';
import DefaultView from './DefaultView.vue';
import DetailedView from './DetailedView.vue';
import { createToast } from '../../../utils/toast';

const props = defineProps({
   subsId: Number,
   limit: Number,
});
const records = ref([]);

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
});
</script>

<template>
   <DefaultView :records="records" />
   <!-- <DetailedView /> -->
</template>
