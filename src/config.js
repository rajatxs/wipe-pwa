// @ts-nocheck
import { getValue } from './utils/store';

export const REMOTE_URL_KEY = 'remote-url';
export const TAG_KEY = 'tag';
export const AUTH_TOKEN_KEY = 'token';
export const APP_SERVER_KEY = 'app-server-key';
export const WA_SERVICE_RESTART_TS_KEY = 'wa-restart-ts';
export const PRESENCE_VIEW_MODE = 'presence-view';

export const APP_APPLICATION_SERVER_KEY = () => import.meta.env.VITE_APP_APPLICATION_SERVER_KEY || getValue(APP_SERVER_KEY);
export const appTag = () => getValue(TAG_KEY);
export const appAuthToken = () => getValue(AUTH_TOKEN_KEY);
export const appRemoteURL = () => getValue(REMOTE_URL_KEY) || window.location.origin;
export const appPresenceViewMode = () => getValue(PRESENCE_VIEW_MODE) || 'default';
