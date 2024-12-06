'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();
//database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    description: { type: String},
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    comment: { type: String}, 
    event_type_id: { type: Number },
    address_id: { type: Number},
    active: { type: Boolean, required: true, default: true }
},{collection:'events'});

EventSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            // Find the max id in the Event collection
            const lastEvent = await this.constructor.findOne().sort({ id: -1 });
            const newId = lastEvent ? lastEvent.id + 1 : 1;
            this.id = newId;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;