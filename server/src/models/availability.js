
class Availability {
/**
     * @param {Array<TimeBlock>} monday Monday availability
     * @param {Array<TimeBlock>} tuesday Tuesday availability
     * @param {Array<TimeBlock>} wednesday Wednesday availability
     * @param {Array<TimeBlock>} thursday Thursday availability
     * @param {Array<TimeBlock>} friday Friday availability
     * @param {Array<TimeBlock>} saturday Saturday availability
     * @param {Array<TimeBlock>} sunday Sunday availability
     * @param {Array<string>} exceptions Specific days off
     */
    constructor (monday, tuesday, wednesday,thursday,friday,saturday,sunday, exceptions) {
        this.monday = monday;
        this.tuesday = tuesday
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
        this.sunday = sunday;
        this.exceptions = exceptions;
    }
    static toObj() {
        return {
            monday: null,
            tuesday: null,
            wednsday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,
            exceptions: null
        };
    }

}
module.exports = Availability