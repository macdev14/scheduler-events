const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventModel");
const Event = mongoose.model("Event");

exports.eventDeleteById = async (event) => {
    //console.log("event", event);
    const {token, id, active} = event;

    try {
        if (!token || !id) {
            return { status: 400, message: "token and id are required" };
        }



        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (new Date() >= new Date(event.start_date)) {
                if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                    await Event.updateOne({ id }, { $set: { active: false } });
                    return { status: 200, message: "Event deleted" };
                }

            }else{
                if (decoded.role == process.env.ROLE_ADMIN) {
                    await Event.updateOne({ id }, { $set: { active: false } });
                    return { status: 200, message: "Event deleted" };
                }
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