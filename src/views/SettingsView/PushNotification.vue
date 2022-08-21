<script>
import { defineComponent } from 'vue';
import { $post, $delete } from '../../utils/http';
import { createToast } from '../../utils/toast';
import { getValue, hasValue, setValue, removeValue } from '../../utils/store';
import { APP_APPLICATION_SERVER_KEY } from '../../config';

const PUSH_SUBS_KEY = 'push-subs-id';

export default defineComponent({
   name: 'PushNotificationContext',
   data() {
      return {
         enabled: false,
      };
   },
   created() {
      this.enabled = hasValue(PUSH_SUBS_KEY);
   },
   methods: {
   
      /**
       * Handles push notification setting
       * @param {boolean} value 
       */
      async handlePushNotificationSetting(value) {
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
               const response = await this.uploadPushPayload(pushPayload);
               setValue(PUSH_SUBS_KEY, response.result.insertId);
               createToast('primary', 'Push notification enabled');
            } catch (error) {
               createToast('error', error.message);
            }
         } else {
            await this.deletePushPayload();
            removeValue(PUSH_SUBS_KEY);
         }
         this.enabled = value;
      },

      /**
       * Uploads push subscription payload
       * @param {object} payload
       * @returns {Promise<object>}
       */
      uploadPushPayload(payload) {
         return $post('/push-subs', {}, payload);
      },

      /**
       * Deletes push subscription payload
       * @returns {Promise<object>}
       */
      deletePushPayload() {
         return $delete('/push-subs/' + getValue(PUSH_SUBS_KEY));
      }
   },
});
</script>

<template>
   <div class="app-setting-context" id="push-notification-setting">
      <label for="push-notification-switch" class="label">
         <h5>Push notifications</h5>
         <small>Get push notifications when someone goes online or offline</small>
      </label>

      <app-switch
         id="push-notification-switch"
         :value="enabled"
         @value="handlePushNotificationSetting"
      />
   </div>
</template>
