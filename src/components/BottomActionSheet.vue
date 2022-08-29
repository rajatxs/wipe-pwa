<template>
   <div class="app-button-action-sheet">
      <div class="button-sheet-content">
         <slot></slot>
      </div>
   </div>
</template>

<style>
.app-button-action-sheet {
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   width: 100%;
   min-height: 60px;
   border-top: 1px solid var(--accents-2);
   background-color: var(--surface);
}
.button-sheet-content {
   position: absolute;
   left: 50%;
   top: 50%;
   width: calc(var(--scale-x) - 42px);
   transform: translate(-50%, -50%);
}
</style>
