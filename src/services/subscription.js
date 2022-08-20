import { $get, $post } from '../utils/http';

/**
 * Returns all subscriptions
 * @returns {Promise<any[]>}
 */
export async function fetchAllSubscriptions() {
   const [, subs] = await $get('/subs');
   return subs.result;
}

/**
 * Adds new subscription
 * @param {object} data 
 */
export async function addSubscription(data) {
   const [status, response] = await $post('/subs', {}, data);
   if (status === 201 || status === 200) {
      return response.result;
   } else {
      throw new Error(response.result);
   }
}
