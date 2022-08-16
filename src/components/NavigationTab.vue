<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
   <nav class="app-navigation-tab">
      <RouterLink 
         to="/" 
         active-class="active" 
         class="app-navigation-tab-item">
         Home
      </RouterLink>
      <RouterLink 
         to="/settings" 
         exact-active-class="active"
         class="app-navigation-tab-item">
         Settings
      </RouterLink>
   </nav>
</template>

<style scoped>
.app-navigation-tab {
   display: flex;
   min-width: 160px;
   height: 34px;
   padding: 6px;
   gap: 4px;
   border-radius: 25px;
   background-color: var(--accents-0);
}
.app-navigation-tab-item {
   display: inherit;
   justify-content: space-around;
   align-items: center;
   min-width: 95px;
   font-size: 90%;
   font-weight: 500;
   border-radius: inherit;
   background-color: transparent;
   color: var(--surface-f);
   text-decoration: none;
   font-family: var(--primary-font);
   -webkit-tap-highlight-color: transparent;
   transition: background-color 90ms linear;
}
.app-navigation-tab-item.active {
   background-color: var(--color);
   color: var(--color-f);
}
.app-navigation-tab-item:not(.active):hover {
   background-color: var(--accents-2);
}
</style>
