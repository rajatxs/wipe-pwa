<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import store from './utils/store';
import AuthView from './views/Auth.vue';
import Header from './components/Header.vue';

const auth = ref(false);

onBeforeMount(() => {
   // If tag is not set
   if (store.tag.length === 0) {
      store.tag = Math.floor(Math.random() * 10e6).toString(16);
   }

   // If token or authToken is not set
   if (store.serverUrl.length > 0 && store.token.length > 0) {
      auth.value = true;
   }
});
</script>

<template>
   <template v-if="auth">
      <Header></Header>
      <main class="mt-16 w-full max-w-[1080px] md:w-1/2 mx-auto h-full">
         <RouterView />
      </main>
   </template>
   <AuthView v-else @done="auth = true" />
</template>
