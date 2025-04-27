import axios from '../utils/axios';

/**
 * Gets server status
 * @returns {Promise<{ active: boolean, lastRestarted: Date|null }>}
 */
export async function fetchServerStatus() {
    const response = await axios.get('/wa-socket/status');
    const result = response.data.result;

    return {
        active: result.opened,
        lastRestarted: result.uptime ? new Date(result.uptime) : null,
    };
}

/**
 * Gets server info
 * @returns {Promise<{ mode: string, version: string }>}
 */
export async function fetchServerInfo() {
    const response = await axios.get('/info');
    const result = response.data.result;

    return {
        mode: result.mode || '',
        version: result.version || '',
    };
}

/**
 * Starts WA server
 * @returns {Promise<boolean>}
 */
export async function startWAServer() {
    const response = await axios.put('/wa-socket/open');
    return response.status === 200;
}

/**
 * Stops WA server
 * @returns {Promise<boolean>}
 */
export async function stopWAServer() {
    const response = await axios.put('/wa-socket/close');
    return response.status === 200;
}
