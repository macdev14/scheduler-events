'use strict'
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/eventTypeModel");
const EventType = mongoose.model("EventType");
require('dotenv').config();


exports.eventTypeCreateTypesPersistence = async () => {
    try {
        const eventTypesCount = await EventType.countDocuments();
        console.log("eventTypesCount", eventTypesCount);
        if (eventTypesCount !== 0) {
            return { status: 200, message: "Database has event types, no action required" };
        }
        await EventType.type_1();
        await EventType.type_2();
        await EventType.type_3();
        await EventType.type_4();
        await EventType.type_5();

        return { status: 201, message: "Event types created successfully" };
    } catch (error) {
        console.error("Error occurred, transaction rolled back:", error);
        return { status: 500, message: "Something went wrong during event type creation", error: error.message };
    }
};