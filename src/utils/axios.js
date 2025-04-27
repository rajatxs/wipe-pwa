import axios from 'axios';
import store from './store';

var instance = axios.create({
    responseType: 'json',
    timeout: 10000,
    validateStatus(status) {
        return status === 200 || status === 201;
    },
});

instance.interceptors.request.use(
    (config) => {
        config.baseURL = store.serverUrl;
        config.headers['X-Tag'] = store.tag;
        config.headers['X-Auth-Token'] = store.token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
