'use strict';
//database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventTypeSchema = new Schema({
    id: { type: Number, unique: true },
    description: { type: String},
    active: { type: Boolean, required: true, default: true }
},{collection:'eventtypes'});


EventTypeSchema.statics.type_1 = async function () {
    try {
        const eventType = {
            id: 1,
            description: 'Recriativo',
            active: true
        };

        await this.updateOne(
            { id: eventType.id }, 
            { $set: eventType },              
            { upsert: true  }                 
        );
    } catch (error) {
        throw error;
    }
};
EventTypeSchema.statics.type_2 = async function () {
    try {
        const eventType = {
            id: 2,
            description: 'Religioso',
            active: true
        };

        await this.updateOne(
            { id: eventType.id }, 
            { $set: eventType },              
            { upsert: true }                 
        );
    } catch (error) {
        throw error;
    }
};
EventTypeSchema.statics.type_3 = async function () {
    try {
        const eventType = {
            id: 3,
            description: 'Cultural',
            active: true
        };

        await this.updateOne(
            { id: eventType.id }, 
            { $set: eventType },              
            { upsert: true  }                 
        );
    } catch (error) {
        throw error;
    }
};
EventTypeSchema.statics.type_4 = async function () {
    try {
        const eventType = {
            id: 4,
            description: 'Interno',
            active: true
        };

        await this.updateOne(
            { id: eventType.id }, 
            { $set: eventType },              
            { upsert: true  }                 
        );
    } catch (error) {
        throw error;
    }
};
EventTypeSchema.statics.type_5 = async function () {
    try {
        const eventType = {
            id: 5,
            description: 'Outro',
            active: true
        };

        await this.updateOne(
            { id: eventType.id }, 
            { $set: eventType },              
            { upsert: true  }                 
        );
    } catch (error) {
        throw error;
    }
};

const EventType = mongoose.model("EventType", EventTypeSchema);
module.exports = EventType;