<script setup>
import { ref, onMounted } from 'vue';
import TableView from '../../assets/icons/table.vue';
import { appPresenceViewMode, PRESENCE_VIEW_MODE } from '../../config';
import { setValue } from '../../utils/store';

const enableDetailedView = ref(false);

function handlePresenceViewModeSetting() {
   if (enableDetailedView.value) {
      setValue(PRESENCE_VIEW_MODE, 'default');
      enableDetailedView.value = false;
   } else {
      setValue(PRESENCE_VIEW_MODE, 'detailed');
      enableDetailedView.value = true;
   }
}

onMounted(function() {
   if (appPresenceViewMode() === 'detailed') {
      enableDetailedView.value = true;
   }
});
</script>

<template>
   <div class="app-setting-context" id="presence-view-mode-setting">
      <label for="presence-detailed-view-mode" class="context-label">
         <div class="icon">
            <TableView />
         </div>
         <div>
            <h5 class="context-title">Presence detailed view</h5>
            <span class="context-desc">Shows timeline of presence activity</span>
         </div>
      </label>

      <app-switch 
         id="presence-detailed-view-mode"
         :value="enableDetailedView"
         @value="handlePresenceViewModeSetting" />
   </div>
</template>
