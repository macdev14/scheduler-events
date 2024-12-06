exports.EventJwtEntity = class EventJwtEntity {
    constructor({token, id, active}) {
        this.token = token;
        this.id = id;
        this.active = active;
    }
};