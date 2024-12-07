exports.EventTypeEntity = class EventTypeEntity {
    constructor(eventTypeJwt) {
        this.id = eventTypeJwt.id;
        this.description = eventTypeJwt.description;
        this.active = eventTypeJwt.active !== undefined ? eventTypeJwt.active : true;
        this.token = eventTypeJwt.token;
    }
}