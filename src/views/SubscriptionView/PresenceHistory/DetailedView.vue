<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import moment from 'moment';
import { stringifyPresenceStatus } from '../../../utils/common';

const props = defineProps({
   records: Array,
});
</script>

<template>
   <div
      v-for="record in props.records"
      :key="record['id']" 
      class="presence-record presence-detailed-record">
      <div class="left">
         <span class="presence-record__time">
            {{ moment(record['ts'], false).format('L LT') }}
         </span>
      </div>

      <div class="center">
         <span>&hyphen;</span>
      </div>

      <div class="right">
         <span class="presenc-record__status">
            {{ stringifyPresenceStatus(record['status']) }}
         </span>
      </div>
   </div>
</template>

<style>
.presence-record__time {
   font-weight: 300;
}
.presenc-record__status {
   font-weight: 300;
   color: var(--accents-6);
}
</style>
