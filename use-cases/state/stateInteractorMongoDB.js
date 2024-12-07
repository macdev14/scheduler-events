'use strict';

const {StateEntity} = require("../../entities/StateEntity");
const {StateJwtEntity} = require("../../entities/StateJwtEntity");

exports.createStates = async ({stateCreateStatesPersistence}, {}) => {
    try {
        const createState = await stateCreateStatesPersistence();
        return createState;
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

