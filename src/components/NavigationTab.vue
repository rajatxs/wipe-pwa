<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
   <nav class="app-navigation-tab">
      <RouterLink to="/" active-class="active" class="app-navigation-tab-item">
         Home
      </RouterLink>
      <RouterLink to="/settings" exact-active-class="active" class="app-navigation-tab-item">
         Settings
      </RouterLink>
   </nav>
</template>

<style scoped>
.app-navigation-tab {
   @apply flex min-w-[200px] p-1 h-[46px] gap-2 rounded-full;
}

.app-navigation-tab-item {
   @apply flex justify-center items-center w-full h-full rounded-full text-black font-medium transition-colors duration-150 bg-neutral-100 dark:bg-neutral-700 dark:text-white;
}

.app-navigation-tab-item.active {
   @apply bg-emerald-500 text-white;
}

.app-navigation-tab-item:not(.active):active {
   @apply bg-neutral-200 dark:bg-neutral-700;
}
</style>
