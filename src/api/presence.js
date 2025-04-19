import axios from '../utils/axios';
import { PresenceRecord } from '../models/Presence';

/**
 * Gets last presence record
 * @param {number} subId - Subscription Id
 * @returns {Promise<PresenceRecord|null>}
 */
export async function fetchLastPresenceRecord(subId) {
    const response = await axios.get(`/presence?subid=${subId}&limit=1`);
    if (Array.isArray(response.data.result) && response.data.result.length > 0) {
        const record = response.data.result.at(0);
        return PresenceRecord.parseResponse(record);
    } else {
        return null;
    }
}

/**
 * Gets presence records
 * @param {number} subId - Subscription Id
 * @param {number} limit - Number of records to fetch
 * @returns {Promise<PresenceRecord[]>}
 */
export async function fetchPresenceRecords(subId, limit) {
    const response = await axios.get(`/presence?subid=${subId}&limit=${limit}`);
    if (Array.isArray(response.data.result)) {
        return response.data.result.map(PresenceRecord.parseResponse);
    } else {
        return [];
    }
}
