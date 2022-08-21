<script>
import { defineComponent } from 'vue';
import { appAuthToken } from '../../config';
import AuthModal from '../../components/AuthModal.vue';

export default defineComponent({
   name: 'AuthToken',
   components: { AuthModal },
   filters: {
      /**
       * Returns suffix portion from token
       * @param {string} val 
       */
      tokenSuffix(val) {
         return '...' + val.slice(-4);
      }
   },
   data() {
      return {
         showPrompt: false,
         token: ''
      }
   },
   created() {
      this.token = appAuthToken();
   },
   methods: {
      handleTokenChanges() {
         this.token = appAuthToken();
         this.showPrompt = false;
      },
      getTruncatedToken() {
         return this.token.slice(0, 4) + '...' + this.token.slice(-4);
      },
   }
});
</script>

<template>
   <div 
      class="app-setting-context" 
      id="remote-url-setting" 
      @click="showPrompt = true">
      <label class="label">
         <h5>Authentication token</h5>
         <small>{{ getTruncatedToken() }}</small>
      </label>
   </div>
   <AuthModal 
      v-if="showPrompt" 
      :value="token"
      @close="handleTokenChanges"
      @blur="handleTokenChanges" />
</template>
