'use strict';

const {EventStateJwtEntity} = require("../../entities/EventStateJwtEntity");

exports.createEventState = async ({eventStateCreatePersistence}, {event_id, state_id, token}) => {
    try {
        const eventState = new EventStateJwtEntity({event_id, state_id, token});
        const createEventStates = await eventStateCreatePersistence(eventState);
        return createEventStates;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}

exports.getAll = async ({eventStateGetAll}, {token}) => {
    try {
        const active = true;
        const eventState = new EventStateJwtEntity({token, active});
        const getEventStates = await eventStateGetAll(eventState);
        return getEventStates;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}

exports.getByIds = async ({eventStateGetByIds}, {token, event_id, state_id}) => {
    try {
        const eventState = new EventStateJwtEntity({token, event_id, state_id});
        const getEventState = await eventStateGetByIds(eventState);
        return getEventState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.getEventStateEventById = async ({eventStateGetEventById}, {token, event_id}) => {
    try {
        const getEventState = await eventStateGetEventById({token, event_id});
        return getEventState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.getEventStateStateById = async ({eventStateGetStateById}, {token, state_id}) => {
    try {
        const getEventState = await eventStateGetStateById({token, state_id});
        return getEventState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.deleteEventState = async ({eventStateDelete}, {token, event_id, state_id}) => {
    try {
        const eventState = new EventStateJwtEntity({token, event_id, state_id});
        const getEventState = await eventStateDelete(eventState);
        return getEventState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.restoreEventState = async ({eventStateRestore}, {token, event_id, state_id}) => {
    try {
        const eventState = new EventStateJwtEntity({token, event_id, state_id});
        const getEventState = await eventStateRestore(eventState);
        return getEventState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}