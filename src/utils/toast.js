function getToastRoot() {
   return document.getElementById('toast-container');
}

/**
 * Creates new toast and append into toast container
 * @param {'default'|'primary'|'error'} type
 * @param {string} message
 * @param {number} [duration]
 */
export function createToast(type, message, duration = 3000) {
   const node = document.createElement('div');
   const text = document.createTextNode(message);

   node.classList.add('app-toast', 'toast__' + type);
   node.appendChild(text);
   getToastRoot().appendChild(node);
   setTimeout(function () {
      node.classList.add('invisible');
   }, duration);
   setTimeout(function () {
      node.remove();
   }, duration + 400);
}
