'use strict'
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/stateModel");
const State = mongoose.model("State");


exports.stateCreateStatesPersistence = async () => {

    try {
        await State.requisition();
        await State.approved();
        await State.shipped();
        await State.finished();
        await State.canceled();

        return ({ status: 201, message: "Event states created successfully" });

    }
    catch (error) {
        console.log(error);
        return  ({status:500, message:"Something went wrong"});
    }
}