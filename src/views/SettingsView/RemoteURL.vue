<script>
import { defineComponent } from 'vue';
import { REMOTE_URL_KEY, appRemoteURL } from '../../config';
import { setValue } from '../../utils/store.js';
import Modal from '../../components/Modal.vue';

export default defineComponent({
   name: 'RemoveURLContext',
   components: { Modal },
   data() {
      return {
         url: '',
         newURL: '',
         showPrompt: false,
      }
   },
   created() {
      this.url = appRemoteURL();
      this.newURL = this.url;
   },
   methods: {
      saveNewURL() {
         setValue(REMOTE_URL_KEY, this.newURL);
         this.url = this.newURL;
         this.showPrompt = false;
      },
   },
});
</script>
<template>
   <div 
      class="app-setting-context" 
      id="remote-url-setting" 
      @click="showPrompt = true">
      <label class="label">
         <h5>Remote URL</h5>
         <small>{{url}}</small>
      </label>
   </div>
   <Modal 
      v-if="showPrompt" 
      title="Set remote URL" 
      @blur="showPrompt = false">
      <div class="input-container">
         <input 
            v-model="newURL"
            type="url" 
            class="input-controller remote-url-input"
            placeholder="http://example.com" />
      </div>
      <template #footer>
         <app-button @click="showPrompt = false">Cancel</app-button>
         <app-button 
            fill="primary" 
            @click="saveNewURL">
            Save
         </app-button>
      </template>
   </Modal>
</template>

<style>
.remote-url-input {
   width: calc(100% - 24px);
}
</style>
