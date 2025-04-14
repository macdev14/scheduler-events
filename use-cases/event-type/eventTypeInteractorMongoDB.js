'use strict';

const {EventTypeJwtEntity} = require("../../entities/EventTypeJwtEntity");

exports.createEventTypes = async ({eventTypeCreateTypesPersistence}, {}) => {
    try {
        const createEventTypes = await eventTypeCreateTypesPersistence();
        return createEventTypes;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}

exports.getAll = async ({eventTypeGetAll}, {token}) => {
    try {
        const active = true;
        const eventType = new EventTypeJwtEntity({token, active});
        const getEventTypes = await eventTypeGetAll(eventType);
        return getEventTypes;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}

exports.getById = async ({eventTypeGetById}, {token, id}) => {
    try {
        const active = true;
        
        const eventType = new EventTypeJwtEntity({token, id, active});
        const getEventType = await eventTypeGetById(eventType);
        return getEventType;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}