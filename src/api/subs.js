import axios from '../utils/axios';
import { Subscription } from '../models/Subscription';

/**
 * Gets all subscriptions
 * @returns {Promise<Subscription[]>}
 */
export async function fetchSubscriptions() {
    const response = await axios.get('/subs');

    if (Array.isArray(response.data.result)) {
        return response.data.result.map(Subscription.parseResponse);
    } else {
        return [];
    }
}

/**
 * Changes subscription status
 * @param {object} data
 * @param {number} data.id
 * @param {boolean} data.enabled
 * @returns {Promise<boolean>}
 */
export async function changeSubscriptionStatus(data) {
    const response = await axios.put(
        `/subs/${data.id}`,
        { enabled: data.enabled },
        { headers: { 'Content-Type': 'application/json' } },
    );
    return response.status === 200;
}

/**
 * Creates new subscription
 * @param {object} data
 * @param {string} data.alias
 * @param {string} data.phone
 * @param {string} data.event
 * @returns {Promise<boolean>}
 */
export async function createSubscription(data) {
    const response = await axios.post('/subs', data);
    return response.status === 200;
}
