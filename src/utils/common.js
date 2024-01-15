/**
 * Returns absolute url of avatar
 * @param {string} seed
 * @param {'svg'|'png'} format
 */
export function avatarUrl(seed, format = 'svg') {
   return `https://api.dicebear.com/7.x/initials/${format}?seed=${seed}&backgroundType=solid&chars=1`;
}

/**
 * Returns new tag
 * @returns {string}
 */
export function generateTag() {
   return Math.floor(Math.random() * 10e6).toString(16);
}

/**
 * Returns readable string format of given `status`
 * @param {number} status 
 */
export function stringifyPresenceStatus(status) {
   if (status === 0) {
      return "offline";
   } else if (status === 1) {
      return "online";
   } else {
      return "unknown";
   }
}
