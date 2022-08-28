/**
 * Returns absolute url of avatar
 * @param {string} seed
 * @param {'svg'|'png'} format
 */
export function avatarUrl(seed, format = 'svg') {
   return `https://avatars.dicebear.com/api/initials/${seed}.${format}?backgroundColorLevel=300&chars=1`;
}

/**
 * Returns new tag
 * @returns {string}
 */
export function generateTag() {
   return Math.floor(Math.random() * 10e6).toString(16);
}
