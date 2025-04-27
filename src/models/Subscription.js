export class Subscription {
    id = NaN;
    enabled = true;
    alias = '';
    event = 'presence.update';
    notify = false;
    phone = '';
    tag = '';

    /**
     * Parses response data
     * @param {object} data
     * @returns {Subscription}
     */
    static parseResponse(data) {
        const sub = new Subscription();

        sub.id = Number(data.id);
        sub.enabled = Boolean(data.enabled);
        sub.alias = String(data.alias);
        sub.event = String(data.event);
        sub.notify = Boolean(data.notify);
        sub.phone = String(data.phone);
        sub.tag = String(data.tag);
        return sub;
    }
}
