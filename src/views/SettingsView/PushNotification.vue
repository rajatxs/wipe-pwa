<script setup>
import { ref, onMounted } from 'vue';
import { $post, $delete } from '../../utils/http';
import { createToast } from '../../utils/toast';
import { getValue, hasValue, setValue, removeValue } from '../../utils/store';
import { APP_APPLICATION_SERVER_KEY } from '../../config';
import BellIcon from '../../assets/icons/bell.vue';

const PUSH_SUBS_ID = 'push-subs-id';
const enabled = ref(false);

/**
 * Uploads push subscription payload
 * @param {object} payload
 * @returns {Promise<object>}
 */
function uploadPushPayload(payload) {
   return $post('/push-subs', {}, payload);
}

/**
 * Deletes push subscription payload
 * @returns {Promise<object>}
 */
function deletePushPayload() {
   return $delete('/push-subs/' + getValue(PUSH_SUBS_ID));
}

/**
 * Handles push notification setting
 * @param {boolean} value
 */
async function handlePushNotificationSetting(value) {
   if (value) {
      const pushPayload = {};

      // @ts-ignore
      const applicationServerKey = APP_APPLICATION_SERVER_KEY();
      const sw = await window.navigator.serviceWorker.ready;
      let push = await sw.pushManager.subscribe({
         userVisibleOnly: true,
         applicationServerKey,
      });

      pushPayload.user_agent = window.navigator.userAgent;
      pushPayload.payload = JSON.stringify(push);

      try {
         const response = await uploadPushPayload(pushPayload);
         setValue(PUSH_SUBS_ID, response.result.id);
         createToast('primary', 'Push notification enabled');
      } catch (error) {
         createToast('error', error.message);
      }
   } else {
      try {
         const sw = await window.navigator.serviceWorker.ready;
         const subs = await sw.pushManager.getSubscription();
         await subs.unsubscribe();
         await deletePushPayload();
         removeValue(PUSH_SUBS_ID);
         createToast('primary', 'Push notification disabled');
      } catch (error) {
         createToast('error', "Couldn't turn off notification");
      }
   }
   enabled.value = value;
}

onMounted(function () {
   enabled.value = hasValue(PUSH_SUBS_ID);
});
</script>

<template>
   <div class="app-setting-context" id="push-notification-setting">
      <label for="push-notification-switch" class="context-label">
         <div class="icon">
            <BellIcon />
         </div>
         <div>
            <h5 class="context-title">Push notifications</h5>
            <span class="context-desc">Get push notifications on different events</span>
         </div>
      </label>

      <app-switch
         id="push-notification-switch"
         :value="enabled"
         @value="handlePushNotificationSetting" />
   </div>
</template>
