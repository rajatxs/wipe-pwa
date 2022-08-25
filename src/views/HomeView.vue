<script>
import { RouterLink } from 'vue-router';
import { $get, $put } from '../utils/http';
import { createToast } from '../utils/toast';
import NullResultView from '../components/NullResultView.vue';
import LoaderView from '../components/LoaderView.vue';

export default {
    data() {
        return {
            subscriptions: [],
            loaded: false,
        }
    },
    components: { 
        RouterLink,
        NullResultView,
        LoaderView,
    },
    async mounted() {
        await this.fetchAllSubscriptions();
    },
    methods: {
        async fetchAllSubscriptions() {
            if (this.loaded) {
                this.loaded = false;
            }

            try {
                const response = await $get('/subs');
                this.subscriptions = response.result;
            } catch (error) {
                createToast('error', error.message);
            }
            this.loaded = true;
        },

        /**
         * Handles update status for spcific subscription
         * @param {boolean} enabled 
         * @param {number} id 
         */
        async updateEnabledStatus(enabled, id) {
            if (!id) {
                return;
            }

            try {
                const response = await $put('/subs/' + id, {}, { enabled });
                createToast('primary', response.message);
            } catch (error) {
                createToast('error', error.message);
            }
        }
    }
}
</script>

<template>
    <div v-if="loaded && subscriptions.length > 0" class="app-subs-list-view">
        <div v-for="sub in subscriptions" :key="sub.id" class="subs-item">
            <RouterLink class="subs-router-link" to="/subs">
                <div class="subs-icon">
                    <img 
                        :src="'https://avatars.dicebear.com/api/initials/:' + sub.alias + 'app.svg?backgroundColorLevel=300&chars=1'" 
                        class="subs-icon-image" 
                        alt="" />
                </div>
                <div class="subs-details">
                    <div class="subs-alias">{{sub.alias}}</div>
                    <div class="subs-status">{{sub.phone}}</div>
                </div>
            </RouterLink>
            <div class="subs-action">
                <app-switch 
                    :id="'sub-switch-' + sub.id"
                    :value="Boolean(sub.enabled)"
                    @value="updateEnabledStatus($event, sub.id)" />
            </div>
        </div>
    </div>
    <LoaderView v-else-if="!loaded" message="Getting subscriptions" />
    <div v-else>
        <NullResultView 
            height="370px"
            img="/img/no-data.svg"
            title="No subscriptions"
            desc="Tap on + icon to add one" />
    </div>
</template>

<style>
.app-subs-list-view {
    padding-top: 8px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
}
.subs-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.subs-router-link {
    display: flex;
    align-items: center;
    width: 80%;
    height: 48px;
    gap: 18px;
    padding: 8px 1.5rem;
    color: inherit;
    border-radius: var(--x-stack-edge-radius);
}
.subs-router-link:hover {
    background-color: var(--accents-1);
}
.subs-action {
    width: 20%;
    height: 48px;
}
.subs-icon {
    width: 46px;
    height: 46px;
}
.subs-icon-image {
    width: inherit;
    height: inherit;
    border-radius: 50%;
}
.subs-details {
    display: flex;
    flex-direction: column;
    gap: 3.6px;
}
.subs-alias {
    font-size: 16px;
    font-weight: 500;
}
.subs-status {
    font-size: 12px;
    color: var(--accents-5);
}
</style>
