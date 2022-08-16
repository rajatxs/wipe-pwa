<script>
import { RouterLink } from 'vue-router';
import NullResultView from '../components/NullResultView.vue';

export default {
    data() {
        return {
            subscriptions: [{}],
            loaded: true
        }
    },
    components: { 
        RouterLink,
        NullResultView,
    }
}
</script>

<template>
    <div v-if="loaded && subscriptions.length > 0" class="app-subs-list-view">
        <RouterLink class="subs-item" to="/subs">
            <div class="subs-icon">
                <img src="https://avatars.dicebear.com/api/initials/:app.svg?backgroundColorLevel=300&chars=1" class="subs-icon-image" alt="" />
            </div>
            <div class="subs-details">
                <div class="subs-alias">Me</div>
                <div class="subs-status">Last seed 34m ago</div>
            </div>
        </RouterLink>
    </div>
    <div v-else-if="!loaded">
        <div>Loading...</div>
    </div>
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
    align-items: center;
    height: 68px;
    gap: 18px;
    padding: 8px 1.5rem;
    border-radius: 12px;
    color: inherit;
    border: 1px solid var(--accents-1);
}
.subs-item:hover {
    background-color: var(--accents-1);
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
}
.subs-status {
    font-size: 12px;
}
</style>
