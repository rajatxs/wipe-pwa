<script setup>
import Loader from './Loader.vue';

const props = defineProps({
    message: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div class="app-loader-view">
        <Loader size="28px" class="w-8 h-8 border-4 border-emerald-500"></Loader>
        <p v-if="message">
            <small>{{ message }}</small>
        </p>
    </div>
</template>

<style>
.app-loader-view {
    @apply w-full h-3/5 flex flex-col py-10 gap-2 justify-center items-center overflow-hidden;
}
</style>
