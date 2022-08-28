<script setup>
import { ref } from 'vue';
import CloudDownloadFillIcon from '../../assets/icons/cloud-download-fill.vue';
import CloudUploadFillIcon from '../../assets/icons/cloud-upload-fill.vue';
import { $put } from '../../utils/http';
import { createToast } from '../../utils/toast';

const uploadingSession = ref(false);
const restoringSession = ref(false);

async function uploadSession() {
   uploadingSession.value = true;
   try {
      const response = await $put('/wa-session/upload');
      createToast('default', response.message);
   } catch (error) {
      createToast('error', error.message);
   }
   uploadingSession.value = false;
}

async function restoreSession() {
   restoringSession.value = true;
   try {
      const response = await $put('/wa-session/restore');
      createToast('default', response.message);
   } catch (error) {
      createToast('error', error.message);
   }
   restoringSession.value = false;
}
</script>

<template>
   <div class="app-session-operation">
      <button 
         :disabled="uploadingSession"
         @click="uploadSession" 
         class="session-op">
         <CloudUploadFillIcon />
         <span v-if="uploadingSession">...</span>
         <span v-else>Upload session</span>
      </button>
      <button 
         :disabled="restoringSession"
         @click="restoreSession" 
         class="session-op">
         <CloudDownloadFillIcon />
         <span v-if="restoringSession">...</span>
         <span v-else>Restore session</span>
      </button>
   </div>
</template>

<style>
.app-session-operation {
   display: flex;
   flex-direction: row;
   justify-content: center;
   gap: 1.6rem;
}
.session-op {
   display: inline-flex;
   flex-direction: column;
   align-items: center;
   gap: 12px;
   background-color: transparent;
   border: none;
   color: var(--accents-6);
   cursor: pointer;
}
.session-op .app-icon {
   width: 48px;
   height: 48px;
   fill: var(--accents-6);
   transition: width 160ms ease, height 160ms ease;
}
.session-op:hover {
   color: var(--surface-f);
}
.session-op:hover .app-icon {
   width: 52px;
   height: 52px;
   fill: var(--surface-f);
}
.session-op:disabled {
   color: var(--accents-3);
   pointer-events: none;
}
.session-op:disabled .app-icon {
   fill: var(--accents-3);
}
</style>
