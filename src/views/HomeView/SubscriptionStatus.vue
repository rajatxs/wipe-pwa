<script>
import { defineComponent } from 'vue';
import { $get } from '../../utils/http';
import moment from 'moment';

export default defineComponent({
   name: 'AppSubscriptionStatus',
   data() {
      return {
         id: NaN,
         active: false,
         timestamp: '',
         loading: true,
      }
   },
   props: {
      subsId: {
         type: Number,
         required: true,
      },
      interval: {
         type: Number,
         default: 3000,
      },
      fallback: {
         type: String,
         required: false,
      },
   },
   mounted() {
      this.fetchLastKnownPresence();

      setInterval(() => {
         this.fetchLastKnownPresence();
      }, this.interval);
   },
   methods: {
      async fetchLastKnownPresence() {
         let subsId = this.subsId;
         let record;

         try {
            const response = await $get(`/presence?subid=${subsId}&limit=1`);

            if (Array.isArray(response.result)) {
               record = response.result[0];
            } else {
               record = response.result;
            }

            if (record) {
               this.id = record.id;
               this.active = Boolean(record.status);
               this.timestamp = record.ts;
            }
         } catch (error) {
            console.error("Couldn't get last seen", error);
         }

         this.loading = false;
      },
   },
   computed: {
      readable() {
         return moment(this.timestamp, true).startOf('minute').fromNow(false);
      }
   }
});
</script>

<template>
   <div class="app-subs-status">
      <template v-if="loading">...</template>
      <template v-else-if="active">online</template>
      <template v-else-if="timestamp">{{readable}}</template>
      <template v-else>{{fallback}}</template>
   </div>
</template>

<style>
.app-subs-status {
   font-size: 12px;
   color: var(--accents-5);
}
</style>
