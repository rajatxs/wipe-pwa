import { getValue } from './store';

/**
 * Makes HTTP Request
 * @param {'GET'|'POST'|'PUT'|'DELETE'} [method]
 * @param {string} [pathname]
 * @param {object} [headers]
 * @param {object} [data]
 */
export async function $request(
   method = 'GET',
   pathname = '/ping',
   headers = {},
   data = {}
) {
   // @ts-ignore
   const url = new URL(pathname, import.meta.env.VITE_APP_REMOTE_URL);
   let resp,
      body,
      responseBody = {},
      respType;

   if (method === 'GET') {
      Object.keys(data).forEach(function (key) {
         url.searchParams.set(key, data[key]);
      });
   } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = body.length;
   }

   headers['X-Tag'] = getValue('tag');
   headers['X-Auth-Token'] = getValue('token');

   /** @type {RequestInit} */
   const options = {
      method,
      headers,
      body,
   };

   resp = await fetch(url.href, options);
   respType = resp.headers.get('Content-Type');

   if (respType.includes('application/json')) {
      responseBody = await resp.json();
   } else if (respType.includes('text/plain')) {
      responseBody = await resp.text();
   } else {
      responseBody = await resp.blob();
   }

   return [resp.status, responseBody, resp.headers];
}

/**
 * Makes HTTP Request with GET Method
 * @param {string} pathname
 * @param {object} headers
 * @param {object} data
 */
export function $get(pathname, headers = {}, data = {}) {
   return $request('GET', pathname, headers, data);
}

/**
 * Makes HTTP Request with POST Method
 * @param {string} pathname
 * @param {object} headers
 * @param {object} data
 */
export function $post(pathname, headers = {}, data = {}) {
   return $request('POST', pathname, headers, data);
}

/**
 * Makes HTTP Request with PUT Method
 * @param {string} pathname
 * @param {object} headers
 * @param {object} data
 */
export function $put(pathname, headers = {}, data = {}) {
   return $request('PUT', pathname, headers, data);
}

/**
 * Makes HTTP Request with DELETE Method
 * @param {string} pathname
 * @param {object} headers
 */
export function $delete(pathname, headers = {}) {
   return $request('DELETE', pathname, headers);
}
