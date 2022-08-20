<script>
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'LoaderView',
   props: {
      message: {
         type: String,
         required: false,
      }
   }
});
</script>

<template>
   <div class="app-loader-view">
      <app-loader size="28px"></app-loader>
      <p v-if="message"><small>{{ message }}</small></p>
   </div>
</template>

<style>
.app-loader-view {
   padding-top: 12px;
   padding-bottom: 12px;
   min-height: 340px;
   gap: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
</style>
