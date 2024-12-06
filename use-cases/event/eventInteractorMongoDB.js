'use strict';

const {EventEntity} = require("../../entities/EventEntity");

exports.create = async ({eventCreatePersistence}, {name, start_date, end_date, description, comment}) => {
    try {
        //persiste
        const event = new EventEntity({name, start_date, end_date, description, comment});
        const createEvent = await eventCreatePersistence(user);
        return createEvent;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}
