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

exports.eventEdit = async (event) => {
    //console.log("event", event);
    const { id, token, name, start_date, end_date, description, comment } = event;

    try {
        if (!id || !token) {
            return { status: 400, message: "token, and id are required" };
        }

        if (name && name.length > process.env.EVENT_NAME_MAX_SIZE) {
            return { status: 400, message: `event name must be less than ${process.env.EVENT_NAME_MAX_SIZE} characters` };
        }

        const parsedStartDate = start_date ? parseDate(start_date) : null;
        const parsedEndDate = end_date ? parseDate(end_date) : null;

        if (!parsedStartDate || !parsedEndDate) {
            return { status: 400, message: "Invalid date format. Use dd/mm/yyyy or yyyy/mm/dd" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const today = new Date();
            if (decoded.role != process.env.ROLE_ADMIN && (parsedStartDate < today || parsedEndDate < today)) {
                return { status: 400, message: "Event dates must be greater than today" };
            }
            if (parsedEndDate < parsedStartDate) {
                return { status: 400, message: "end_date cannot be before start_date" };
            }

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const updateEvent = {};
                if (name) updateEvent.name = name;
                if (start_date) updateEvent.start_date = parsedStartDate;
                if (end_date) updateEvent.end_date = parsedEndDate;
                if (description) updateEvent.description = description;
                if (comment) updateEvent.comment = comment;
                console.log("updateEvent", updateEvent);
                console.log("id", id);
                // await Event.findByIdAndUpdate(id, updateEvent, { new: true });
                return { status: 200, message: "Event updated successfully" };
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
