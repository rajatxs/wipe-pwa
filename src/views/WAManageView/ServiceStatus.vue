<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
   loading: Boolean,
   status: Boolean,
});

const label = computed(function () {
   return props.status ? 'Running' : 'Closed';
});
const classes = computed(function () {
   const list = ['app-service-status'];

   if (props.loading) {
      list.push('status__loading');
   } else {
      list.push(props.status ? 'status__on' : 'status__off');
   }

   return list;
});
</script>

<template>
   <div :class="classes">
      <strong>{{ loading ? '...' : label }}</strong>
   </div>
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
   margin: 8rem auto;
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
.app-service-status.status__loading {
   background-color: var(--scolor);
}
.app-service-status.status__on {
   background-color: var(--color);
   box-shadow: 0 0 0 0 var(--color);
   color: var(--color-f);
   animation: pulse-anim 1.5s infinite linear;
}
.app-service-status.status__off {
   background-color: var(--accents-7);
   box-shadow: 0 0 0 0 var(--accents-7);
   color: var(--accents-0);
}
</style>
