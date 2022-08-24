import { precacheAndRoute } from 'workbox-precaching';
import { pushHandler } from './worker/handler';

self.addEventListener('message', (event) => {
   if (event.data && event.data.type === 'SKIP_WAITING') {
      // @ts-ignore
      self.skipWaiting();
   }
});

self.addEventListener('push', pushHandler);

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);
