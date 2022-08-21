<script>
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'app-icon-button',
   props: {
      size: {
         type: String,
         default: 'medium',
      },
   },
   computed: {
      iconButtonClasses() {
         return [
            'app-icon-button',
            'size__' + this.size,
         ];
      }
   }
});
</script>

<template>
   <div :class="iconButtonClasses">
      <slot></slot>
   </div>
</template>

<style>
.app-icon-button {
   position: relative;
   border-radius: 50%;
   background-color: transparent;
   cursor: pointer;
   transition: background-color 120ms linear;
}
.app-icon-button:hover {
   background-color: var(--accents-2);
}
.app-icon-button svg {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   fill: var(--accents-5);
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
   width: 48px;
   height: 48px;
}
.app-icon-button.size__medium svg {
   width: 20px;
   height: 20px;
}
@media (prefers-color-scheme: dark) {
   .app-icon-button {
      background-color: transparent;
   }
}
</style>
