<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import appState from './state.js';
import store from './utils/store';
import AuthView from './views/Auth.vue';
import PlusCircleIcon from './assets/icons/plus-circle.vue';
import WhatsappIcon from './assets/icons/whatsapp.vue';
import NavigationTab from './components/NavigationTab.vue';
import PWALoader from './components/PWALoader.vue';
import IconButton from './components/IconButton.vue';
import WAServiceDialog from './components/WAServiceDialog.vue';
import AddSubscriptionDialog from './components/AddSubscriptionDialog.vue';

const viewWAServiceDialog = ref(false);
const viewAddSubscriptionDialog = ref(false);

onBeforeMount(() => {
    // If tag is not set
    if (store.tag.length === 0) {
        store.tag = Math.floor(Math.random() * 10e6).toString(16);
    }

    // If token or authToken is not set
    if (store.serverUrl.length > 0 && store.token.length > 0) {
        appState.auth = true;
    }
});
</script>

<template>
    <PWALoader />
    <template v-if="appState.auth">
        <header class="app-header">
            <div class="app-container app-header__container">
                <IconButton @click="viewWAServiceDialog = true">
                    <WhatsappIcon />
                </IconButton>
                <NavigationTab />
                <IconButton @click="viewAddSubscriptionDialog = true">
                    <PlusCircleIcon />
                </IconButton>
            </div>
        </header>

        <main class="app-container mt-16 mx-auto h-full">
            <RouterView />
        </main>

        <WAServiceDialog v-if="viewWAServiceDialog" @close="viewWAServiceDialog = false" />
        <AddSubscriptionDialog 
            v-if="viewAddSubscriptionDialog" 
            @added="viewAddSubscriptionDialog = false"
            @close="viewAddSubscriptionDialog = false" />
    </template>
    <AuthView v-else @done="appState.auth = true" />
</template>

<style>
.app-header {
    @apply fixed flex justify-center items-center top-0 left-0 right-0 w-full h-16 border-b z-10 backdrop-blur-md border-neutral-200 bg-white/80 dark:bg-neutral-800/80 dark:border-neutral-700;
}

.app-header__container {
    @apply flex justify-between items-center h-full px-5;
}
</style>
