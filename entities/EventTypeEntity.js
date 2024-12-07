exports.EventTypeEntity = class EventTypeEntity {
    constructor(eventType) {
        this.id = eventType.id;
        this.description = eventType.description;
        this.active = eventType.active !== undefined ? eventType.active : true;
    }
}