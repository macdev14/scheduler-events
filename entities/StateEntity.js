exports.StateEntity = class StateEntity {
    constructor(state) {
        this.id = state.id;
        this.description = state.description;
        this.active = state.active !== undefined ? state.active : true;
    }
}