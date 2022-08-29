<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import BottomActionSheet from '../../components/BottomActionSheet.vue';
import TrashIcon from '../../assets/icons/trash3.vue';
import Modal from '../../components/Modal.vue';
import { $delete } from '../../utils/http';
import { createToast } from '../../utils/toast';

const emit = defineEmits(['delete']);
const props = defineProps({
   subsId: Number,
});
const showDeleteConfirmationPrompt = ref(false);
const deleteConfirmed = ref(false);
const deleting = ref(false);
watch(deleteConfirmed, async function (value) {
   if (value) {
      deleting.value = true;
      await deleteSubscription();
      deleting.value = false;
   }

   if (showDeleteConfirmationPrompt.value) {
      showDeleteConfirmationPrompt.value = false;
   }
});

async function deleteSubscription() {
   try {
      const response = await $delete('/subs/' + props.subsId);
      createToast('default', response.message);
      emit('delete', props.subsId, response);
   } catch (error) {
      createToast('error', error.message);
   }
}
</script>

<template>
   <BottomActionSheet>
      <div class="subs-actions">
         <app-icon-button @click="showDeleteConfirmationPrompt = true">
            <TrashIcon />
         </app-icon-button>
      </div>
   </BottomActionSheet>

   <!-- subscription delete confirmation prompt -->
   <Modal v-show="showDeleteConfirmationPrompt" :header="false">
      Are you sure you want delete this subscription
      <template #footer>
         <app-button @click="showDeleteConfirmationPrompt = false">Cancel</app-button>
         <app-button 
            fill="error" 
            :loading="deleting"
            :disabled="deleting"
            @click="deleteConfirmed = true">
            Delete
         </app-button>
      </template>
   </Modal>
</template>
