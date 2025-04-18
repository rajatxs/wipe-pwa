<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: false,
    },
    value: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['value']);

function handleChanges($event) {
    emit('value', $event.target.checked);
}
</script>

<template>
    <div class="app-switch">
        <input
            class="app-switch-input"
            type="checkbox"
            :id="id"
            :checked="value"
            @change="handleChanges" />
        <label class="app-switch-label" :for="id"></label>
    </div>
</template>

<style>
.app-switch {
    display: inline-flex;
    margin: 0 10px;
}
.app-switch input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
    -webkit-tap-highlight-color: transparent;
}
.app-switch input[type='checkbox']:checked + label {
    /* background: var(--color); */
    @apply bg-emerald-500;
}
.app-switch input[type='checkbox']:checked + label::after {
    left: calc(100% - 4px);
    transform: translateX(-100%);
}
.app-switch label {
    cursor: pointer;
    width: 48px;
    height: 24px;
    display: block;
    border-radius: 24px;
    position: relative;
    @apply bg-neutral-200;
}
.app-switch label::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    transition: 0.3s;
    @apply bg-white;
}
</style>
