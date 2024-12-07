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
exports.update = async ({eventEdit}, {id, token, name, start_date, end_date, description, comment}) => {
    try {
        
        const event = new EventEntity({id, token, name, start_date, end_date, description, comment});
        const createEvent = await eventEdit(event);
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
exports.deleteById = async ({eventDeleteById}, {token, id}) => {
    try {
        const active = true;
        
        const event = new EventJwtEntity({token, id, active});
        const getEvent = await eventDeleteById(event);
        return getEvent;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
exports.restoreById = async ({eventRestoreById}, {token, id}) => {
    try {
        const active = true;
        
        const event = new EventJwtEntity({token, id, active});
        const getEvent = await eventRestoreById(event);
        return getEvent;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
