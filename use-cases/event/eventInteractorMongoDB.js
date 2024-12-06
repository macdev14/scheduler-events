'use strict';

const {EventEntity} = require("../../entities/EventEntity");
const {EventJwtEntity} = require("../../entities/EventJwtEntity");

exports.create = async ({eventCreatePersistence}, {token, name, start_date, end_date, description, comment}) => {
    try {
        
        const event = new EventEntity({token, name, start_date, end_date, description, comment});
        const createEvent = await eventCreatePersistence(event);
        return createEvent;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.getAll = async ({eventGetAll}, {token}) => {
    try {
        const active = true;
        const event = new EventEntity({token, active});
        const getEvents = await eventGetAll(event);
        return getEvents;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.getById = async ({eventGetById}, {token, id}) => {
    try {
        const active = true;
        
        const event = new EventJwtEntity({token, id, active});
        const getEvent = await eventGetById(event);
        return getEvent;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
