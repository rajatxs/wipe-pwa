<script>
import { defineComponent } from 'vue';
import Modal from './Modal.vue';
import { setValue } from '../utils/store';

export default defineComponent({
   name: 'AuthModal',
   data() {
      return {
         token: '',
      }
   },
   components: { Modal },
   methods: {
      saveToken() {
         if (this.token.length < 1) {
            return;
         }
         setValue('token', this.token);
         this.$emit('close');
      }
   }
});
</script>

<template>
   <Modal title="Authentication Token">
      <input 
         type="password" 
         class="input-controller secret-token-input"
         v-model="token" />

      <template #footer>
         <app-button fill="primary" @click="saveToken">Done</app-button>
      </template>
   </Modal>
</template>

<style>
.secret-token-input {
   width: calc(100% - 24px);
}
</style>
