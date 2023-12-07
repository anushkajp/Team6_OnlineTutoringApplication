export class TimeBlock {
    /**
     * @param {string} start Start time 24 hr
     * @param {string} end End time 24 hr
     * @param {boolean} online Signifies if a Tutor is available online or in person
     */
    constructor (start, end,online) {
        this.start = start;
        this.end = end;
        this.online = online
    }
}