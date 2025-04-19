/** @type {Map<string, number|string|boolean>} */
var cacheMap = new Map();

/**
 * Returns string value from localStorage with cache
 * @param {string} key
 * @returns {string}
 */
function getString(key) {
   if (cacheMap.has(key)) {
      return cacheMap.get(key);
   } else {
      cacheMap.set(key, localStorage.getItem(key) || '');
      return cacheMap.get(key);
   }
}

export default {
   /** Clears store cache */
   clearCache() {
      cacheMap.clear();
   },

   /**
    * Returns tag
    * @type {string}
    */
   get tag() {
      return getString('wipe_tag');
   },

   /**
    * Sets new tag
    * @param {string} value
    */
   set tag(value) {
      localStorage.setItem('wipe_tag', String(value));
   },

   /**
    * Returns server url
    * @type {string}
    */
   get serverUrl() {
      return getString('wipe_server_url');
   },

   /**
    * Sets new server url
    * @param {string} value
    */
   set serverUrl(value) {
      localStorage.setItem('wipe_server_url', String(value));
   },

   /**
    * Returns token
    * @type {string}
    */
   get token() {
      return getString('wipe_token');
   },

   /**
    * Sets new token
    * @param {string} value
    */
   set token(value) {
      localStorage.setItem('wipe_token', String(value));
   },
};
