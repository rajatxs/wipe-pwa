<script setup>
import Dialog from './Dialog.vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

function close() {
   offlineReady.value = false;
   needRefresh.value = false;
}
</script>

<template>
   <Dialog v-if="offlineReady || needRefresh" title="App updated" @close="close">
      <div class="flex flex-wrap" role="alert">
         <span v-if="offlineReady">App is ready to work offline.</span>
         <span v-else>New content is available. Click the reload button to update.</span>
      </div>

      <div class="flex flex-row gap-3 mt-5">
         <button class="app-button" @click="close">Close</button>
         <button v-if="needRefresh" class="app-button" @click="updateServiceWorker()">Reload</button>
      </div>
   </Dialog>
</template>
