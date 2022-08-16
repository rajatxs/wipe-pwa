<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import PWALoader from './components/PWALoader.vue';
</script>

<template>
  <PWALoader />
  <Header></Header>
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-main {
  margin-top: 64px;
}
</style>
