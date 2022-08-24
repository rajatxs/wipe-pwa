import { PRESENCE_MSG_KEY, SERVICE_MSG_KEY, SOCKET_MSG_KEY } from './msg';

/**
 * Parse `msgPayload` and show push notification
 * @param {any[]} msgPayload 
 */
export function showPushNotification(msgPayload) {
   let title, body;
   const [ type, ...args ] = msgPayload; 

   switch (type) {
      case PRESENCE_MSG_KEY: {
         const [ alias, status ] = args;
         title = 'Presence update'
         body = `${alias} is ${status? 'online': 'offline'}`;
         break;
      }
      case SERVICE_MSG_KEY: {
         const [ serviceType, status ] = args;

         switch(serviceType) {
            case SOCKET_MSG_KEY: {
               title = `Socket is ${status? 'opened': 'closed'}`;
               break;
            }
         }
         break;
      }
   }

   try {
      // @ts-ignore
      registration.showNotification(title, { body });
   } catch (error) {
      console.error("Couldn't show notification", error);
   }
}
