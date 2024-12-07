exports.StateJwtEntity = class StateJwtEntity {
    constructor(stateJwt) {
        this.id = stateJwt.id;
        this.description = stateJwt.description;
        this.active = stateJwt.active !== undefined ? stateJwt.active : true;
        this.token = stateJwt.token;
    }
}