<script>
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'app-button',
   props: {
      block: {
         type: Boolean,
         default: false,
      },
      fill: {
         type: String,
         default: 'default',
      },
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
   <button :class="buttonClasses">
      <slot></slot>
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
   border-radius: 25px;
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
   display: inline-block;
   margin-right: 4px;
   margin-left: 4px;
}
.app-button.fill__default {
   background-color: var(--accents-2);
   color: var(--accents-6);
}
.app-button.fill__primary {
   background-color: var(--color);
   color: var(--color-f);
}
</style>
