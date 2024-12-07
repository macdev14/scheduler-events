const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventTypeModel");
const EventType = mongoose.model("EventType");

exports.eventTypeGetAll = async (eventType) => {
    //console.log("eventType", eventType);
    const {token, active} = eventType;

    try {
        if (!token) {
            return { status: 400, message: "token required" };
        }



        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const eventTypes = await EventType.find({ active });
                return { status: 200, message: eventTypes };
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