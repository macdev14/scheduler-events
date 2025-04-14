const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/stateModel");
const State = mongoose.model("State");

exports.stateGetAll = async (state) => {
    //console.log("state", state);
    const {token, active} = state;

    try {
        if (!token) {
            return { status: 400, message: "token required" };
        }



        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const states = await State.find({ active });
                return { status: 200, message: states };
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