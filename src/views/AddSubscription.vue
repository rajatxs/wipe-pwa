<script>
import { defineComponent } from 'vue';
import { $post } from '../utils/http';
import { createToast } from '../utils/toast';

export default defineComponent({
   name: 'AddSubscription',
   data() {
      return {
         alias: '',
         phone: '',
         event: 'presence.update',
         inProgress: false,
      }
   },
   methods: {
      getPayload() {
         return {
            alias: this.alias,
            phone: this.phone,
            event: this.event,
         };
      },
      async addSubscription() {
         const payload = this.getPayload();

         if (!this.inProgress) {
            this.inProgress = true;
         }

         try {
            await $post('/subs', {}, payload);
            createToast('primary', "Subscription added");
            this.$router.push('/');
         } catch (error) {
            createToast('error', error.message);            
         }
         this.inProgress = false;
      },
   }
});
</script>

<template>
   <div class="add-subscription-view">
      <h4>Add subscription</h4>
      <div class="input-container">
         <input 
            v-model="alias"
            type="text" 
            class="input-controller" 
            placeholder="Alias" />
      </div>
      <div class="input-container">
         <input 
            v-model="phone"
            type="text" 
            class="input-controller" 
            placeholder="Phone" />
      </div>
      <br />
      <div>
         <app-button 
            fill="primary" 
            :disabled="inProgress || alias.length < 2 || phone.length < 10"
            :loading="inProgress"
            @click="addSubscription">
            Add
         </app-button>
      </div>
   </div>
</template>

<style>
.add-subscription-view {
   display: flex;
   padding-top: 24px;
   flex-direction: column;
   align-items: center;
}
.input-controller {
   min-width: 240px;
}
</style>
