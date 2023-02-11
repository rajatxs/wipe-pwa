<script setup>
import { defineProps, computed } from 'vue';
import HDDIcon from '../../assets/icons/hdd-fill.vue';

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
      <HDDIcon />
      <strong>{{ loading ? '...' : label }}</strong>
   </div>
</template>

<style>
.app-service-status {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 8rem auto 4rem auto;
   width: 120px;
   height: 120px;
   border-radius: 50%;
   position: relative;
}
.app-service-status.status__loading .app-icon {
   fill: var(--accents-4);
}
.app-service-status.status__on .app-icon {
   fill: var(--color-dark);
}
.app-service-status.status__off .app-icon {
   fill: var(--accents-7);
}
</style>
