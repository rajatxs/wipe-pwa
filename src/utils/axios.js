import axios from 'axios';
import store from './store';

export default axios.create({
    baseURL: store.serverUrl,
    responseType: 'json',
    timeout: 10000,
    headers: {
        'X-Tag': store.tag,
        'X-Auth-Token': store.token,
    },
    validateStatus(status) {
        return status === 200 || status === 201;
    },
});
