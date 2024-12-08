const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/eventModel");
const Event = mongoose.model("Event");

exports.eventGetByRequisitionId = async (event) => {
    console.log("event", event);
    const {token, requisition_id , active} = event;

    try {
        if (!token || !requisition_id) {
            return { status: 400, message: "token and requisition_id are required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER || decoded.role == process.env.ROLE_USER) {
                if(decoded.role == process.env.ROLE_USER){
                    const event = await Event.find({requisition_id, user_id: decoded.id, active });
                    if (!event || event.length === 0) {
                        return { status: 404, message: "Event not found" };
                    }
                    return { status: 200, message: event };
                }else{
                    const event = await Event.find({requisition_id, active });
                    if (!event || event.length === 0) {
                        return { status: 404, message: "Event not found" };
                    }
                    return { status: 200, message: event };
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