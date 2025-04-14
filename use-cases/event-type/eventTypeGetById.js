const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventTypeModel");
const EventType = mongoose.model("EventType");

exports.eventTypeGetById = async (eventType) => {
    console.log("eventType", eventType);
    const {token, id , active} = eventType;

    try {
        if (!token || !id) {
            return { status: 400, message: "token and id are required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const eventType = await EventType.find({id, active });
                if (!eventType || eventType.length === 0) {
                    return { status: 404, message: "Event type not found" };
                }
                return { status: 200, message: eventType };
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