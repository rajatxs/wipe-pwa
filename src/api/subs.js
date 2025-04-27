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
 * Gets subscription by id
 * @param {number} id - Subscription Id
 * @returns {Promise<Subscription|null>}
 */
export async function fetchSubscription(id) {
    const response = await axios.get(`/subs/${id}`);
    if (response.data.result) {
        return Subscription.parseResponse(response.data.result);
    } else {
        return null;
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
 * Changes subscription notification setting
 * @param {object} data
 * @param {number} data.id
 * @param {boolean} data.notify
 * @returns {Promise<boolean>}
 */
export async function changeSubscriptionNotification(data) {
    const response = await axios.put(
        `/subs/${data.id}`,
        { notify: data.notify },
        { headers: { 'Content-Type': 'application/json' } },
    );
    return response.status === 200 || response.status === 201;
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

/**
 * Deletes subscription
 * @param {number} id - Subscription Id
 * @returns {Promise<boolean>}
 */
export async function deleteSubscription(id) {
    const response = await axios.delete(`/subs/${id}`);
    return response.status === 200;
}
