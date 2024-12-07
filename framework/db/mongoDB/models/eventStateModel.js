'use strict';
//database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventStateSchema = new Schema({
    event_id: { type: Number, required: true },
    state_id: { type: Number, required: true },
    user_id: { type: String},
    date: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true }
},{collection:'eventstates'});


const EventState = mongoose.model("EventState", EventStateSchema);
module.exports = EventState;