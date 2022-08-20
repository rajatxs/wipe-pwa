import { $post } from '../utils/http';

export async function uploadPushSubscription(payload = {}) {
   const [status, response] = await $post('/push-subs', {}, payload);

   if (status === 200 || status === 201) {
      return response.result;
   } else {
      throw new Error(response.result);
   }
}
