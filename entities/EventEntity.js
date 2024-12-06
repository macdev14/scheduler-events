const bcryptjs = require('bcryptjs');
const Event = require('../framework/db/mongoDB/models/eventModel');

exports.EventEntity = class EventEntity {
    constructor(event) {
        this.name = event.name;
        this.description = event.description;
        this.start_date = event.start_date || new Date();
        this.end_date = event.end_date || new Date();
        this.comment = event.comment || null;
        this.active = event.active !== undefined ? event.active : true;
        this.token = event.token;
    }
}