'use strict';
//database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventStateSchema = new Schema({
    event_id: { type: Number },
    state_id: { type: Number},
    user: { type: String},
    active: { type: Boolean, required: true, default: true }
},{collection:'eventstates'});


const EventState = mongoose.model("EventState", EventStateSchema);
module.exports = EventState;