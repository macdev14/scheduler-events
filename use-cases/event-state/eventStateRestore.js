const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventStateModel");
const EventState = mongoose.model("EventState");

exports.eventStateRestore = async (eventState) => {
    //console.log("eventState", eventState);
    const {token, event_id, state_id} = eventState;

    try {
        if (!token || !event_id || !state_id) {
            return { status: 400, message: "token, event_id and state_id are required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const eventStates = await EventState.updateOne({event_id, state_id}, { active: true });
                if (!eventStates || eventStates.nModified === 0) {
                    return { status: 404, message: "EventState not found" };
                }
                return { status: 200, message: eventStates };
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