import { precacheAndRoute } from 'workbox-precaching';

self.addEventListener('message', (event) => {
   if (event.data && event.data.type === 'SKIP_WAITING') {
      // @ts-ignore
      self.skipWaiting();
   }
});

self.addEventListener('push', (event) => {
   const title = 'Presence Update';
   const body = event.data.text();
   const options = { body };

   try {
      registration.showNotification(title, options);
   } catch (error) {
      console.error("SW Couldn't show notification", error);
   }
});

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);
