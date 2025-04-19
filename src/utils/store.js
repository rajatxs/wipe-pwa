export default {
   /**
    * Returns tag
    * @type {string}
    */
   get tag() {
      return localStorage.getItem('wipe_tag') || '';
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
      return localStorage.getItem('wipe_server_url') || '';
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
      return localStorage.getItem('wipe_token') || '';
   },

   /**
    * Sets new token
    * @param {string} value
    */
   set token(value) {
      localStorage.setItem('wipe_token', String(value));
   },
};
