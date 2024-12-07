const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventStateModel");
const EventState = mongoose.model("EventState");

exports.eventStateGetAll = async (eventState) => {
    //console.log("eventState", eventState);
    const {token, active} = eventState;

    try {
        if (!token) {
            return { status: 400, message: "token required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const eventStates = await EventState.find({ active });
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