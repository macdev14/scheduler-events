'use strict';
//database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StateSchema = new Schema({
    id: { type: Number, unique: true },
    description: { type: String},
    active: { type: Boolean, required: true, default: true }
},{collection:'states'});


StateSchema.statics.requisition = async function () {
    try {
        const state = {
            id: 1,
            description: 'Requisição',
            active: true
        };

        await this.updateOne(
            { id: state.id }, 
            { $set: state },              
            { upsert: true }                 
        );
    } catch (error) {
        throw error;
    }
};
StateSchema.statics.approved = async function () {
    try {
        const state = {
            id: 2,
            description: 'Aprovado',
            active: true
        };

        await this.updateOne(
            { id: state.id }, 
            { $set: state },              
            { upsert: true }                 
        );
    } catch (error) {
        throw error;
    }
};
StateSchema.statics.shipped = async function () {
    try {
        const state = {
            id: 3,
            description: 'Expedido',
            active: true
        };

        await this.updateOne(
            { id: state.id }, 
            { $set: state },              
            { upsert: true }                 
        );
    } catch (error) {
        throw error;
    }
};
StateSchema.statics.finished = async function () {
    try {
        const state = {
            id: 4,
            description: 'Terminado',
            active: true
        };

        await this.updateOne(
            { id: state.id }, 
            { $set: state },              
            { upsert: true }                 
        );
    } catch (error) {
        throw error;
    }
};
StateSchema.statics.canceled = async function () {
    try {
        const state = {
            id: 1,
            description: 'Cancelado',
            active: true
        };

        await this.updateOne(
            { id: state.id }, 
            { $set: state },              
            { upsert: true }                 
        );
    } catch (error) {
        throw error;
    }
};

const State = mongoose.model("State", StateSchema);
module.exports = State;