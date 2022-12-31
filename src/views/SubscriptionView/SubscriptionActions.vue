<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import BottomActionSheet from '../../components/BottomActionSheet.vue';
import TrashIcon from '../../assets/icons/trash3.vue';
import Modal from '../../components/Modal.vue';
import { $delete, $put } from '../../utils/http';
import { createToast } from '../../utils/toast';
import BellIcon from '../../assets/icons/bell.vue';
import BellSlashIcon from '../../assets/icons/bell-slash.vue';
import { SUBSCRIPTION_STORAGE_KEY, removePayload } from '../../utils/storage';

const emit = defineEmits(['update', 'delete']);
const props = defineProps({
   subsInfo: Object,
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
      const response = await $delete('/subs/' + props.subsInfo.id);
      createToast('default', response.message);
      emit('delete', props.subsInfo.id, response);
   } catch (error) {
      createToast('error', error.message);
   }
}

async function changeNotificationSetting() {
   /** @type {Number} */
   let notify;

   /** @type {'default'|'primary'} */
   let toastType;

   /** @type {'on'|'off'} */
   let label;

   if (props.subsInfo.notify === 1) {
      notify = 0;
      toastType = 'default';
      label = 'off';
   } else {
      notify = 1;
      toastType = 'primary';
      label = 'on';
   }

   try {
      await $put('/subs/' + props.subsInfo.id, {}, { notify });
      createToast(toastType, `Notification is turned ${label} for ${props.subsInfo.alias}`);
      removePayload(SUBSCRIPTION_STORAGE_KEY);
      emit('update', props.subsInfo.id);
   } catch (error) {
      createToast('error', "Couldn't change notification setting");
   }
}
</script>

<template>
   <BottomActionSheet>
      <div class="subs-actions">
         <app-icon-button 
            title="Delete subscription"
            @click="showDeleteConfirmationPrompt = true">
            <TrashIcon />
         </app-icon-button>
         <app-icon-button 
            title="Turn on/off notification"
            @click="changeNotificationSetting">
            <BellSlashIcon v-if="subsInfo.notify" />
            <BellIcon v-else />
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

<style>
.subs-actions {
   display: flex;
   justify-content: space-evenly;
}
</style>
