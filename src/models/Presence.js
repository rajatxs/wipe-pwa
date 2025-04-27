export class PresenceRecord {
    id = NaN;
    status = false;
    lastseen = NaN;
    subId = NaN;
    tag = '';
    timestamp = new Date();

    /**
     * Parses response data
     * @param {object} data
     * @returns {PresenceRecord}
     */
    static parseResponse(data) {
        const record = new PresenceRecord();

        record.id = Number(data.id);
        record.status = Boolean(data.status);
        record.lastseen = Number(data.lastseen);
        record.subId = Number(data.subid);
        record.tag = String(data.tag);
        record.timestamp = new Date(data.ts);
        return record;
    }
}
