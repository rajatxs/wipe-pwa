
/**
 * Returns value by given `key`
 * @param {string} key 
 */
export function getValue(key) {
   return localStorage.getItem('wipe:' + key);
}

/**
 * Sets new value by given `key`
 * @param {string} key 
 * @param {string} value 
 */
export function setValue(key, value) {
   localStorage.setItem('wipe:' + key, value);
}

/**
 * Check whether value is exists or not by given `key`
 * @param {string} key 
 * @returns {boolean}
 */
export function hasValue(key) {
   return localStorage.hasOwnProperty('wipe:' + key);
}

/**
 * Removes value by given `key`
 * @param {string} key 
 */
export function removeValue(key) {
   localStorage.removeItem('wipe:' + key);
}
