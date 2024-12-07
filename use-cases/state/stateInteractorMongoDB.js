'use strict';

const {StateJwtEntity} = require("../../entities/StateJwtEntity");

exports.createStates = async ({stateCreateStatesPersistence}, {}) => {
    try {
        const createState = await stateCreateStatesPersistence();
        return createState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}

exports.getAll = async ({stateGetAll}, {token}) => {
    try {
        const active = true;
        const state = new StateJwtEntity({token, active});
        const getStates = await stateGetAll(state);
        return getStates;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}

exports.getById = async ({stateGetById}, {token, id}) => {
    try {
        const active = true;
        
        const state = new StateJwtEntity({token, id, active});
        const getState = await stateGetById(state);
        return getState;
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: "Something went wrong: "  + error});
    }
}