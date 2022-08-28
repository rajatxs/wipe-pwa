import { PRESENCE_MSG_KEY, SERVICE_MSG_KEY, SOCKET_MSG_KEY } from './msg';

/**
 * Parse `msgPayload` and show push notification
 * @param {any[]} msgPayload
 */
export function showPushNotification(msgPayload) {
   const badge = '/badge-128x128.png';
   let title,
      body,
      timestamp = Date.now();
   const [type, ...args] = msgPayload;

   switch (type) {
      case PRESENCE_MSG_KEY: {
         const [alias, status, ts] = args;
         title = 'Presence update';
         body = `${alias} is ${status ? 'online' : 'offline'}`;
         timestamp = ts;
         break;
      }
      case SERVICE_MSG_KEY: {
         const [serviceType, status] = args;

         switch (serviceType) {
            case SOCKET_MSG_KEY: {
               title = `Socket is ${status ? 'opened' : 'closed'}`;
               break;
            }
         }
         break;
      }
   }

   try {
      // @ts-ignore
      registration.showNotification(title, { body, badge, timestamp });
   } catch (error) {
      console.error("Couldn't show notification", error);
   }
}
