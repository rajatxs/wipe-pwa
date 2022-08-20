<script>
import { defineComponent } from 'vue';
import { addSubscription } from '../services/subscription';
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
         const { alias, phone, event } = this;
         return { alias, phone, event };
      },
      async handleAddSubscriptionAction() {
         const payload = this.getPayload();
         try {
            await addSubscription(payload);
            createToast('primary', "Subscription added");
            this.$router.push('/');
         } catch (error) {
            console.error(error);
            createToast('error', error.message);
         }
      }
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
            :disabled="alias.length < 2 || phone.length < 10"
            @click="handleAddSubscriptionAction">
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
