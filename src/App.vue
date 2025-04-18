<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import store from './utils/store';
import AuthView from './views/Auth.vue';
import PlusCircleIcon from './assets/icons/plus-circle.vue';
import WhatsappIcon from './assets/icons/whatsapp.vue';
import NavigationTab from './components/NavigationTab.vue';
import IconButton from './components/IconButton.vue';
import WAServiceDialog from './components/WAServiceDialog.vue';

const auth = ref(false);
const viewWAServiceDialog = ref(false);

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
        <header class="app-header">
            <div class="app-header__container">
                <IconButton @click="viewWAServiceDialog = true">
                    <WhatsappIcon />
                </IconButton>
                <NavigationTab />
                <IconButton @click="$router.push('/add')">
                    <PlusCircleIcon />
                </IconButton>
            </div>
        </header>

        <main class="mt-16 w-full max-w-[1080px] md:w-1/2 mx-auto h-full">
            <RouterView />
        </main>

        <WAServiceDialog v-if="viewWAServiceDialog" @close="viewWAServiceDialog = false" />
    </template>
    <AuthView v-else @done="auth = true" />
</template>

<style>
.app-header {
    @apply fixed flex justify-center items-center top-0 left-0 right-0 w-full h-16 border-b z-10 border-neutral-200 bg-white;
}
.app-header__container {
    @apply w-full flex justify-between items-center max-w-[1080px] md:w-1/2 h-full px-3;
}
</style>
