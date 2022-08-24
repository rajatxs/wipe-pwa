import { toByteArray } from 'base64-js';
import { decode } from 'msgpackr';
import { showPushNotification } from './helpers';

/**
 * Handles push event
 * @param {Event} event
 */
export function pushHandler(event) {
   let base64, bytes, msgPayload;
   if (event.type !== 'push' || !event.isTrusted || !event['data']) {
      return;
   }

   try {
      base64 = event['data'].text();
      bytes = toByteArray(base64);
      msgPayload = decode(bytes);

      if (!Array.isArray(msgPayload)) {
         throw new Error("payload is not an array");
      }
   } catch (error) {
      console.error("Couldn't read push data", error);
   }

   showPushNotification(msgPayload);
}
