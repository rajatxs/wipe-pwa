<script>
import { defineComponent } from 'vue';
import AuthModal from './components/AuthModal.vue';
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import PWALoader from './components/PWALoader.vue';
import { generateTag } from './utils/common';
import { hasValue, setValue } from './utils/store';

export default defineComponent({
  name: 'App',
  data() {
    return {
      requireToken: false,
    }
  },
  components: {
    AuthModal,
    Header,
    PWALoader,
    RouterView,
  },
  created() {
    if (!hasValue('tag')) {
      setValue('tag', generateTag());
    }

    if (!hasValue('token')) {
      this.requireToken = true;
    }
  }
})
</script>

<template>
  <PWALoader />
  <Header></Header>
  <main class="app-main">
    <RouterView />
    <AuthModal 
      v-if="requireToken"
      @close="requireToken = false" />
  </main>
</template>

<style scoped>
.app-main {
  margin-top: 64px;
}
</style>
