<script setup>
import { ref, defineEmits } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { fetchSubscriptions, createSubscription } from '../api/subs';
import Dialog from './Dialog.vue';

const alias = ref('');
const phone = ref('');
const emit = defineEmits(['added']);

const queryClient = useQueryClient();
const { mutate: mutateCreateSubscription } = useMutation({
    mutationFn() {
        return createSubscription({
            alias: alias.value,
            phone: phone.value,
            event: 'presence.update',
        })
    },
    onSuccess() {
        queryClient.fetchQuery({
            queryKey: ['subs'],
            queryFn: fetchSubscriptions,
        }).finally(function () {
            emit('added')
        });
    },
    onError() {
        alert('Unable to add subscription');
    },
});
</script>

<template>
    <Dialog title="Add Subscription">
        <form @submit.prevent="mutateCreateSubscription">
            <div class="app-textinput-container">
                <label for="alias" class="app-textinput-label">Alias</label>
                <input 
                    v-model="alias" 
                    type="text" 
                    id="alias" 
                    placeholder="Type alias here" 
                    class="app-textinput"
                    autocomplete="name" 
                    maxlength="30" 
                    required />
            </div>
            <div class="app-textinput-container">
                <label for="phone" class="app-textinput-label">Phone</label>
                <input 
                    v-model="phone" 
                    type="text" 
                    id="phone" 
                    placeholder="Type phone here" 
                    class="app-textinput"
                    autocomplete="mobile" 
                    maxlength="12" 
                    required />
            </div>

            <div class="p-2">
                <button class="app-button" type="submit">Add</button>
            </div>
        </form>
    </Dialog>
</template>
