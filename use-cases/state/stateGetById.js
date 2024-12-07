const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../../framework/db/mongoDB/models/stateModel");
const State = mongoose.model("State");

exports.stateGetById = async (state) => {
    console.log("state", state);
    const {token, id , active} = state;

    try {
        if (!token || !id) {
            return { status: 400, message: "token and id are required" };
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {
                const state = await State.find({id, active });
                if (!state || state.length === 0) {
                    return { status: 404, message: "Event state not found" };
                }
                return { status: 200, message: state };
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