<script>
import { defineComponent } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import Modal from './Modal.vue';

const { updateServiceWorker } = useRegisterSW();

export default defineComponent({
   name: 'PWALoader',
   components: {
      Modal,
   },
   setup() {
      const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
      const close = async () => {
         offlineReady.value = false;
         needRefresh.value = false;
      };
      return { offlineReady, needRefresh, updateServiceWorker, close };
   },
   methods: {
      async close() {
         // @ts-ignore
         this.offlineReady.value = false;
         // @ts-ignore
         this.needRefresh.value = false;
      },
      async update() {
         await updateServiceWorker();
      },
   },
});
</script>

<template>
   <Modal v-if="offlineReady || needRefresh" :header="false">
      <div class="flex flex-wrap" role="alert">
         <div class="message mt-1">
            <span v-if="offlineReady">App ready to work offline</span>
            <span v-else>New content available, click on reload button to update.</span>
         </div>
      </div>

      <template #footer>
         <app-button 
            @click="close" 
            fill="default">
            Close
         </app-button>
         <app-button 
            v-if="needRefresh" 
            @click="update()" 
            fill="primary">
            Reload
         </app-button>
      </template>
   </Modal>
</template>
