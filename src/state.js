import { reactive } from 'vue';
import store from './utils/store';

export default reactive({
    /** Authentication flag */
    auth: false,

    /** View all subscriptions flag */
    viewAllSubscriptions: store.viewAllSubscriptions,
});
