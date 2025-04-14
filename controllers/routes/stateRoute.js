const { stateGetAll } = require("../../use-cases/state/stateGetAll");
const { stateGetById } = require("../../use-cases/state/stateGetById");
const stateInteractorMongoDB = require("../../use-cases/state/stateInteractorMongoDB");
const router = require("express").Router();

/**
 * @api {get} /event/state/getAll Get all states
 * @apiName GetAllStates
 * @apiGroup State
 * @apiPermission token
 *
 * @apiHeader {String} token User's token
 *
 * @apiSuccess {Number} status 200
 * @apiSuccess {String} message States retrieved successfully
 * @apiSuccess {Object[]} states Array of states
 * @apiSuccess {Number} states.id State id
 * @apiSuccess {String} states.name State name
 * @apiSuccess {String} states.description State description
 * @apiSuccess {String} states.color State color
 * @apiSuccess {Boolean} states.active State active status
 * @apiSuccess {Date} states.creation_date State creation date
 * @apiSuccess {Date} states.last_modification_date State last modification date
 *
 * @apiError {Number} status 400
 * @apiError {String} message Access denied. Insufficient permissions.
 */
router.route('/event/state/getAll').get(
    async (req, res) => {
        const token = req.headers['token'];
        try {
            const state = await stateInteractorMongoDB.getAll({stateGetAll},{token});
            res.status(state.status).send(state)
        } catch (error) {
            throw error;
        }
       
    }
);
/**
 * @api {get} /event/state/getById Get state by ID
 * @apiName GetStateById
 * @apiGroup State
 * @apiPermission token
 *
 * @apiHeader {String} token User's token
 * 
 * @apiParam {Number} id State unique ID
 * 
 * @apiSuccess {Number} status 200
 * @apiSuccess {Object} state State object
 * @apiSuccess {Number} state.id State id
 * @apiSuccess {String} state.name State name
 * @apiSuccess {String} state.description State description
 * @apiSuccess {String} state.color State color
 * @apiSuccess {Boolean} state.active State active status
 * @apiSuccess {Date} state.creation_date State creation date
 * @apiSuccess {Date} state.last_modification_date State last modification date
 *
 * @apiError {Number} status 400
 * @apiError {String} message Access denied. Insufficient permissions.
 * @apiError {Number} status 404 State not found
 */
router.route('/event/state/getById').get(
    async (req, res) => {
        const {id} = req.body;
        const token = req.headers['token'];
        try {
            const state = await stateInteractorMongoDB.getById({stateGetById}, {token, id});
            res.status(state.status).send(state);
        } catch (error) {
            throw error;
        }
    }
);
module.exports = router;