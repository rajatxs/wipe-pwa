<script>
import { defineComponent } from 'vue';
import TrashIcon from '../../assets/icons/trash3.vue';
import { clearStorage } from '../../utils/storage';
import { createToast } from '../../utils/toast';

export default defineComponent({
   name: 'ClearData',
   components: {
      TrashIcon
   },
   methods: {
      clearData() {
         clearStorage();
         createToast('primary', "Storage cleared");
      }
   }
});
</script>

<template>
   <div 
      class="app-setting-context" 
      id="clear-data-setting"
      @click="clearData">
      <label class="context-label">
         <div class="icon"><TrashIcon /></div>
         <div>
            <h5 class="context-title">Clear data</h5>
            <span class="context-desc">Clear saved data from browser</span>
         </div>
      </label>
   </div>
</template>
