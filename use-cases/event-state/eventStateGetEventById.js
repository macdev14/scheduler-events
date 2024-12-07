const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventStateModel");
const EventState = mongoose.model("EventState");

exports.eventStateGetEventById = async (eventState) => {
    console.log("eventState", eventState);
    const {token, id} = eventState;

    try {
        if (!token || !id) {
            return { status: 400, message: "token and id are required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const eventState = await EventState.find({state_id: id, active: true });
                if (!eventState || eventState.length === 0) {
                    return { status: 404, message: "Event not found" };
                }
                return { status: 200, message: eventState };
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