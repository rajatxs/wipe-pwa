
export const SUBSCRIPTION_STORAGE_KEY = "wipe:subs";

/**
 * Returns saved data payload from local storage
 * @param {string} key 
 * @returns {object|Array<any>}
 */
export function getPayload(key) {
   let raw = localStorage.getItem(key);

   if (!raw) {
      return null;
   }

   return JSON.parse(raw);
}

/**
 * Writes given `payload` to local storage
 * @param {string} key 
 * @param {object|Array<any>} payload 
 */
export function savePayload(key, payload) {
   let raw = JSON.stringify(payload);
   localStorage.setItem(key, raw);
}

/**
 * Removes data payload by given `key`
 * @param {string} key 
 */
export function removePayload(key) {
   localStorage.removeItem(key);
}

/** Removes all saved data payloads */
export function clearStorage() {
   removePayload(SUBSCRIPTION_STORAGE_KEY);
}
