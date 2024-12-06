'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();
//database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String},
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    comment: { type: String}, 
    event_type_id: { type: Number },
    address_id: { type: Number},
    active: { type: Boolean, required: true, default: true }
},{collection:'events'});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;