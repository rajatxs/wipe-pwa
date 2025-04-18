<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
   size: {
      type: String,
      default: 'medium',
   },
});

const iconButtonClasses = computed(() => [
   'app-icon-button',
   'size__' + props.size,
]);
</script>

<template>
   <div :class="iconButtonClasses">
      <slot></slot>
   </div>
</template>

<style>
.app-icon-button {
   @apply flex justify-center items-center w-10 h-10 rounded-full cursor-pointer transition-colors duration-150;
}

.app-icon-button:hover {
   @apply bg-neutral-100 dark:bg-neutral-700;
}

.app-icon-button:active {
   @apply bg-neutral-200 dark:bg-neutral-600;
}

.app-icon-button svg {
   @apply fill-black dark:fill-white;
}

.app-icon-button.size__small {
   width: 32px;
   height: 32px;
}

.app-icon-button.size__small svg {
   width: 18px;
   height: 18px;
}

.app-icon-button.size__medium {
   width: 42px;
   height: 42px;
}

.app-icon-button.size__medium svg {
   width: 24px;
   height: 24px;
}

@media (prefers-color-scheme: dark) {
   .app-icon-button {
      @apply bg-transparent;
   }
}
</style>
