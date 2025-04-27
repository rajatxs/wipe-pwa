<script setup>
import { ref } from 'vue';
import store from '../utils/store';

const emit = defineEmits(['done']);

const serverUrl = ref('');
const token = ref('');

function handleSubmit() {
    store.serverUrl = serverUrl.value;
    store.token = token.value;
    emit('done');
}
</script>

<template>
    <div class="auth-view">
        <div class="auth-view__container">
            <header class="py-4 text-center">
                <h1 class="text-2xl font-bold">Welcome</h1>
                <p>Continue to Wipe</p>
            </header>

            <form class="mt-5" @submit.prevent="handleSubmit">
                <div class="app-textinput-container">
                    <label for="serverUrl" class="app-textinput-label">Server URL</label>
                    <input
                        v-model="serverUrl"
                        type="url"
                        id="serverUrl"
                        placeholder="Enter your server URL"
                        class="app-textinput"
                        required />
                </div>
                <div class="app-textinput-container">
                    <label for="token" class="app-textinput-label">Token</label>
                    <input
                        v-model="token"
                        type="password"
                        id="token"
                        placeholder="Enter your token"
                        class="app-textinput"
                        required />
                </div>
                <div class="p-2">
                    <button type="submit" class="app-button">Continue</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.auth-view {
    @apply flex justify-center items-center w-screen h-screen bg-neutral-50 dark:bg-neutral-900 dark:text-white;
}
.auth-view__container {
    @apply w-full md:w-[400px] h-full md:h-auto p-4 rounded-lg border-0 md:border border-neutral-200 shadow-md bg-white dark:bg-neutral-800 dark:border-neutral-700;
}
</style>
