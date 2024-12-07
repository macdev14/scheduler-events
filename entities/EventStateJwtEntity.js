exports.EventStateJwtEntity = class EventStateJwtEntity {
    constructor(eventStateJwt) {
        this.event_id = eventStateJwt.event_id;
        this.state_id = eventStateJwt.state_id;
        this.user_id = eventStateJwt.user_id || null;
        this.active = eventStateJwt.active !== undefined ? eventStateJwt.active : true;
        this.token = eventStateJwt.token;
    }
}