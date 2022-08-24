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
   padding-top: 12px;
   padding-bottom: 12px;
   padding-right: 16px;
   cursor: pointer;
   border-radius: var(--x-stack-edge-radius);
   -webkit-tap-highlight-color: transparent;
}
.app-setting-context:hover {
   background-color: var(--accents-1);
}
.app-setting-context .context-label {
   display: flex;
   flex-direction: row;
}
.app-setting-context .context-label .icon {
   display: flex;
   width: 60px;
   padding-top: 2px;
   justify-content: center;
   align-items: flex-start;
}
.app-setting-context .context-label .app-icon {
   width: 18px;
   height: 18px;
   fill: var(--accents-6);
}
.context-title {
   font-weight: 500;
   font-size: 16px;
   line-height: 12px;
   letter-spacing: inherit;
}
.context-desc {
   font-size: 80%;
   color: var(--accents-5);
}
</style>
