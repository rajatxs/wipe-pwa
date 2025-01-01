import { PRESENCE_MSG_KEY, SERVICE_MSG_KEY, SOCKET_MSG_KEY, STATUS_ADDED } from './msg';

/**
 * Parse `msgPayload` and show push notification
 * @param {any[]} msgPayload
 */
export function showPushNotification(msgPayload) {
   const badge = '/badge-128x128.png';
   let title,
      body,
      tag,
      timestamp = Date.now();
   const [type, ...args] = msgPayload;
   let silent = true;
   let vibrate = false;

   switch (type) {
      case PRESENCE_MSG_KEY: {
         const [alias = 'User', status, ts] = args;
         title = 'Presence update';
         body = `${alias} is ${status ? 'online' : 'offline'}`;
         tag = `presence:${alias.replace(/\s/g, '')}`;
         timestamp = ts;
         break;
      }
      case SERVICE_MSG_KEY: {
         const [serviceType, status] = args;

         switch (serviceType) {
            case SOCKET_MSG_KEY: {
               title = "Socket connection";
               body = `Socket is ${status ? 'opened' : 'closed'}`;
               tag = 'event:socket';
               break;
            }
         }
         break;
      }
      case STATUS_ADDED: {
         const [ts] = args;
         title = 'New status added';
         body = 'Open the app to view updates';
         tag = 'status';
         timestamp = ts;
         silent = false;
         vibrate = true;
         break;
      }
   }

   try {
      // @ts-ignore
      registration.showNotification(title, { 
         body, 
         badge, 
         tag,
         timestamp,
         silent,
         vibrate,
         renotify: false,
         requireInteraction: false,
      });
   } catch (error) {
      console.error("Couldn't show notification", error);
   }
}
