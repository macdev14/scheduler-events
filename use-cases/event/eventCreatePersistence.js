const mongoose = require("mongoose");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventModel");
const Event = mongoose.model("Event");

exports.eventCreatePersistence = async (event) => {
    console.log("event", event);
    const { name, start_date, end_date, description, comment } = event;
    try {
        if (!name || !start_date || !end_date ) {
            return ({ status: 400, message: "name, start_date and end_date are required" });
        }

        if (name.length > process.env.EVENT_NAME_MAX_SIZE) {
            return ({ status: 400, message: `event name must be less than ${process.env.EVENT_NAME_MAX_SIZE} characters` });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== process.env.ROLE_ADMIN || decoded.role !== process.env.ROLE_MANAGER) {
                return ({status: 403, message: "Access denied. Insufficient permissions."});   
            }
        } catch (err) {
            return ({status: 403, message: "Access denied"});
        }


        const createEvent = await Event.create({name, start_date, end_date, description, comment});
        console.log("createEvent", createEvent);
        return ({ status: 201, message: "Event created successfully" });
    } catch (error) {
        console.log("error", error);
        return ({ status: 500, message: "Something went wrong" });
    }
}
