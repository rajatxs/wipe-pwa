<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SettingView',
    data() {
        return {
            pushNotificationEnabled: false,
        }
    },
    methods: {
        async handlePushNotificationSetting(value) {
            console.log("CALL", value);

            if (value) {
                const applicationServerKey = import.meta.env.VITE_APP_APPLICATION_SERVER_KEY;
                const sw = await window.navigator.serviceWorker.ready;
                let push = await sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey,
                });
                console.log("ROW", JSON.stringify(push));
            } else {

            }
            this.pushNotificationEnabled = value;
        },
    }
});
</script>

<template>
    <div class="app-settings-view">
        <div class="app-setting-context" id="push-notification-setting">
            <label for="push-notification-switch" class="label">
                <h5>Push notifications</h5>
                <div><small>Get push notifications when someone goes online or offline</small></div>
            </label>

            <app-switch 
                id="push-notification-switch" 
                :value="pushNotificationEnabled"
                @value="handlePushNotificationSetting" />
        </div>
    </div>
</template>

<style>
.app-setting-context {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid var(--accents-2);
}
</style>
