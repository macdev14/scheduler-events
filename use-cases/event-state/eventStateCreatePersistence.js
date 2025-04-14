const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { use } = require("../../controllers/routes/stateRoute");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventStateModel");
const EventState = mongoose.model("EventState");

exports.eventStateCreatePersistence = async (eventState) => {
    //console.log("eventState", eventState);
    const { event_id, state_id, token } = eventState;

    try {
        if (!event_id || !state_id || !token) {
            return { status: 400, message: "token, event_id and state_id are required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log("decoded", decoded);
            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {

                const createEventState = {
                    event_id,
                    state_id,
                    user_id: decoded.id
                };
                await EventState.create(createEventState);
                console.log("createEventState", createEventState);
                return { status: 201, message: "Event state created successfully" };
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