/**
 * Returns new tag
 * @returns {string}
 */
export function generateTag() {
   return Math.floor(Math.random() * 10e6).toString(16);
}
