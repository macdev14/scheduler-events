'use strict';

const {EventTypeEntity} = require("../../entities/EventTypeEntity");
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

// exports.getAll = async ({eventGetAll}, {token}) => {
//     try {
//         const active = true;
//         const event = new EventEntity({token, active});
//         const getEvents = await eventGetAll(event);
//         return getEvents;
//     } catch (error) {
//         console.log(error);
//         return ({ status: 500, message: "Something went wrong: "  + error});
//     }
// }
// exports.getById = async ({eventGetById}, {token, id}) => {
//     try {
//         const active = true;
        
//         const event = new EventJwtEntity({token, id, active});
//         const getEvent = await eventGetById(event);
//         return getEvent;
//     } catch (error) {
//         console.log(error);
//         return ({ status: 500, message: "Something went wrong: "  + error});
//     }
// }

