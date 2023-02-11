<script setup>
import { ref, defineProps } from 'vue';
import BottomActionSheet from '../../components/BottomActionSheet.vue';
import { $put } from '../../utils/http';
import { createToast } from '../../utils/toast';
import { setValue } from '../../utils/store';
import { WA_SERVICE_RESTART_TS_KEY } from '../../config';

const loading = ref(false);
const props = defineProps({
   status: Boolean,
});

async function startService() {
   loading.value = true;
   try {
      const response = await $put('/wa-socket/open');
      createToast('default', response.message);
      setValue(WA_SERVICE_RESTART_TS_KEY, String(Date.now()));
   } catch (error) {
      createToast('error', error.message);
   }
   loading.value = false;
}

async function closeService() {
   loading.value = true;
   try {
      const response = await $put('/wa-socket/close');
      createToast('default', response.message);
   } catch (error) {
      createToast('error', error.message);
   }
   loading.value = false;
}
</script>

<template>
   <BottomActionSheet>
      <div class="service-actions">
         <app-button
            v-if="status"
            :loading="loading"
            :disabled="loading"
            @click="closeService"
            fill="error"
            block>
            Stop service
         </app-button>

         <app-button
            v-else
            :loading="loading"
            :disabled="loading"
            @click="startService"
            fill="primary"
            block>
            Start service
         </app-button>
      </div>
   </BottomActionSheet>
</template>

<style>
.service-actions {
   padding: 12px;
}
</style>
