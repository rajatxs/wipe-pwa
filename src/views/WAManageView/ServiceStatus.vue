<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
   status: Boolean,
});

const label = computed(function() {
   return props.status? 'Running': 'Closed';
});
</script>

<template>
   <div class="app-service-status" :data-status-on="status"><strong>{{label}}</strong></div>
</template>

<style>
@keyframes pulse-anim {
   100% {
      box-shadow: 0 0 0 40px #0000;
   }
}
.app-service-status {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-left: auto;
   margin-right: auto;
   margin-top: 8rem;
   margin-bottom: 5rem;
   width: 120px;
   height: 120px;
   border-radius: 50%;
   position: relative;
}
.app-service-status:before,
.app-service-status:after {
   content: '';
   position: absolute;
   inset: 0;
   border-radius: inherit;
   box-shadow: 0 0 0 0 var(--color);
   color: var(--color-f);
   animation: inherit;
   animation-delay: -0.5s;
}
.app-service-status:after {
   animation-delay: -1s;
}
.app-service-status[data-status-on='true'] {
   background: var(--color);
   box-shadow: 0 0 0 0 var(--color);
   color: var(--color-f);
   animation: pulse-anim 1.5s infinite linear;
}
.app-service-status[data-status-on='false'] {
   background: var(--accents-7);
   box-shadow: 0 0 0 0 var(--accents-7);
   color: var(--accents-0);
}
</style>
