const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventModel");
const Event = mongoose.model("Event");
const moment = require('moment');

// Utility function to parse dates
const parseDate = (dateString) => {
    const formats = ['DD/MM/YYYY', 'YYYY/MM/DD'];
    const date = moment(dateString, formats, true);
    return date.isValid() ? date.toDate() : null;
};

exports.eventCreatePersistence = async (event) => {
    //console.log("event", event);
    const { token, name, start_date, end_date, description, comment, requisition_id } = event;

    try {
        if (!name || !start_date || !end_date || !token || !requisition_id) {
            return { status: 400, message: "token, name, start_date, end_date and requisition_id are required" };
        }

        
        const eventExists = await Event.findOne({ requisition_id });
        if (eventExists) {
            return { status: 400, message: "requisition_id must be unique for each event" };
        }

        if (name.length > process.env.EVENT_NAME_MAX_SIZE) {
            return { status: 400, message: `event name must be less than ${process.env.EVENT_NAME_MAX_SIZE} characters` };
        }

        const parsedStartDate = parseDate(start_date);
        const parsedEndDate = parseDate(end_date);

        if (!parsedStartDate || !parsedEndDate) {
            return { status: 400, message: "Invalid date format. Use dd/mm/yyyy or yyyy/mm/dd" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const createEvent = {
                    name,
                    start_date: parsedStartDate,
                    end_date: parsedEndDate,
                    description,
                    comment,
                    requisition_id,
                    user_id: decoded.id
                };
                await Event.create(createEvent);
                console.log("createEvent", createEvent);
                return { status: 201, message: "Event created successfully" };
            }
            return ({status: 403, message: "Access denied. Insufficient permissions."});
        } catch (err) {
            console.log("err", err);
            return ({status: 403, message: "Access denied"});
        }

    } catch (error) {
        console.log("error", error);
        return { status: 500, message: "Something went wrong" };
    }
};