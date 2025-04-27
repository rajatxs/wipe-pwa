import moment from 'moment';

/**
 * Returns a human readable time string
 * @param {string|Date} date
 * @returns {string}
 */
export function getReadableTime(date) {
   return moment(date, true).startOf('minute').fromNow(false);
}

/**
 * Returns absolute url of avatar
 * @param {string} seed
 * @param {'svg'|'png'} format
 */
export function avatarUrl(seed, format = 'svg') {
   return `https://api.dicebear.com/7.x/initials/${format}?seed=${seed}&backgroundType=solid&chars=1`;
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
