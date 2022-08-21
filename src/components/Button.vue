<script>
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'app-button',
   props: {
      disabled: {
         type: Boolean,
         default: false,
      },
      block: {
         type: Boolean,
         default: false,
      },
      fill: {
         type: String,
         default: 'default',
      },
      loading: {
         type: Boolean,
         default: false,
      }
   },
   computed: {
      buttonClasses() {
         return [
            'app-button',
            'fill__' + this.fill,
            this.block? 'block': 'inline',
         ];
      }
   }
});
</script>

<template>
   <button :class="buttonClasses" :disabled="disabled">
      <app-loader v-if="loading" color="fg" size="14px"></app-loader>
      <slot v-else></slot>
   </button>
</template>

<style>
.app-button {
   margin-top: 4px;
   margin-bottom: 4px;
   min-width: 120px;
   font-size: 0.94rem;
   font-family: var(--primary-font);
   justify-content: center;
   align-items: center;
   height: 38px;
   border-radius: 10px;
   border: none;
   cursor: pointer;
   transition: background-color 120ms linear;
}
.app-button.block {
   display: block;
   width: 100%;
   margin-left: 0;
   margin-right: 0;
   min-width: auto;
}
.app-button.inline {
   display: inline-flex;
   margin-right: 4px;
   margin-left: 4px;
   justify-content: center;
}
.app-button.fill__default {
   background-color: var(--accents-2);
   color: var(--accents-6);
}
.app-button.fill__primary {
   background-color: var(--color);
   color: var(--color-f);
}
.app-button[disabled] {
   background-color: var(--accents-2);
   color: var(--accents-4);
   pointer-events: none;
}
</style>
