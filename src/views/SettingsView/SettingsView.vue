<script setup>
import PushNotificationContext from './PushNotification.vue';
import RemoveURLContext from './RemoteURL.vue';
import AuthTokenContext from './AuthToken.vue';
</script>

<template>
   <div class="app-settings-view">
      <RemoveURLContext />
      <AuthTokenContext />
      <PushNotificationContext />
   </div>
</template>

<style>
.app-settings-view {
   padding-top: 8px;
   padding-bottom: 8px;
}
.app-setting-context {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 12px;
   padding: 12px 18px;
   cursor: pointer;
}
.app-setting-context:hover {
   background-color: var(--accents-1);
}
</style>
