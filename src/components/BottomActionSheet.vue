<template>
   <div class="app-button-action-sheet">
      <slot></slot>
   </div>
</template>

<style>
.app-button-action-sheet {
   position: fixed;
   bottom: 0;
   left: 50%;
   right: auto;
   width: calc(var(--scale-x));
   z-index: 100;
   background-color: var(--surface);
   transform: translateX(-50%);
}
@media screen and (min-width: 680px) {
   .app-button-action-sheet {
      width: calc(var(--scale-x) - 20%);
   }
}
</style>
