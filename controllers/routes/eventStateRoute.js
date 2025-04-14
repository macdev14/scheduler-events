const { eventStateCreatePersistence } = require("../../use-cases/event-state/eventStateCreatePersistence");
const { eventStateGetAll } = require("../../use-cases/event-state/eventStateGetAll");
const { eventStateGetByIds } = require("../../use-cases/event-state/eventStateGetByIds");
const { eventStateGetEventById } = require("../../use-cases/event-state/eventStateGetEventById");
const { eventStateGetStateById } = require("../../use-cases/event-state/eventStateGetStateById");
const { eventStateDelete } = require("../../use-cases/event-state/eventStateDelete");
const { eventStateRestore } = require("../../use-cases/event-state/eventStateRestore");
const eventStateInteractorMongoDB = require("../../use-cases/event-state/eventStateInteractorMongoDB");
const router = require("express").Router();

/**
 * @api {post} /event/eventState/create Create an eventState
 * @apiName CreateEventState
 * @apiGroup EventState
 *
 * @apiParam {Number} event_id Event id
 * @apiParam {Number} state_id State id
 *
 * @apiSuccess {Object} eventState EventState created
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X POST
 *     http://localhost:3000/event/eventState/create
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"event_id": 12345, "state_id":1}'
 */
router.route('/event/eventState/create').post(
    async (req, res) => {
        const {event_id, state_id} = req.body;
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.createEventState({eventStateCreatePersistence},{event_id, state_id, token});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);
/**
 * @api {get} /event/eventState/getAll Get all eventStates
 * @apiName GetAllEventStates
 * @apiGroup EventState
 *
 * @apiSuccess {Array} eventStates Array of eventStates
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/eventState/getAll
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 */
router.route('/event/eventState/getAll').get(
    async (req, res) => {
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.getAll({eventStateGetAll},{token});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {get} /event/eventState/getByIds Get all eventStates by event_id and state_id
 * @apiName GetAllEventStatesByIds
 * @apiGroup EventState
 *
 * @apiParam {Number} event_id Event id
 * @apiParam {Number} state_id State id
 *
 * @apiSuccess {Array} eventStates Array of eventStates
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/eventState/getByIds
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"event_id": 12345, "state_id":1}'
 */
router.route('/event/eventState/getByIds').get(
    async (req, res) => {
        const {event_id, state_id} = req.body;
        
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.getByIds({eventStateGetByIds},{token, event_id, state_id});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);
/**
 * @api {get} /event/eventState/event/get Get all events by event_id
 * @apiName GetAllEventsByEventId
 * @apiGroup EventState
 *
 * @apiParam {Number} event_id Event id
 *
 * @apiSuccess {Array} eventStates Array of eventStates
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/eventState/event/get
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"event_id": 12345}'
 */
router.route('/event/eventState/event/get').get(
    async (req, res) => {
        const {event_id} = req.body;
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.getEventStateEventById({eventStateGetEventById},{token, event_id});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {get} /event/eventState/state/get Get all events by state_id
 * @apiName GetAllEventsByStateId
 * @apiGroup EventState
 *
 * @apiParam {Number} state_id State id
 *
 * @apiSuccess {Array} eventStates Array of eventStates
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/eventState/state/get
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"state_id":1}'
 */
router.route('/event/eventState/state/get').get(
    async (req, res) => {
        const {state_id} = req.body;
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.getEventStateStateById({eventStateGetStateById},{token, state_id});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {put} /event/eventState/delete Delete one eventState
 * @apiName DeleteEventState
 * @apiGroup EventState
 *
 * @apiParam {Number} event_id Event id
 * @apiParam {Number} state_id State id
 *
 * @apiSuccess {Object} eventState EventState deleted
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X PUT
 *     http://localhost:3000/event/eventState/delete
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"event_id": 12345, "state_id":1}'
 */
router.route('/event/eventState/delete').put(
    async (req, res) => {
        const {event_id, state_id} = req.body;
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.deleteEventState({eventStateDelete},{token, event_id, state_id});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {put} /event/eventState/restore Restore one eventState
 * @apiName RestoreEventState
 * @apiGroup EventState
 *
 * @apiParam {Number} event_id Event id
 * @apiParam {Number} state_id State id
 *
 * @apiSuccess {Object} eventState EventState restored
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X PUT
 *     http://localhost:3000/event/eventState/restore
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"event_id": 12345, "state_id":1}'
 */
router.route('/event/eventState/restore').put(
    async (req, res) => {
        const {event_id, state_id} = req.body;
        const token = req.headers['token'];
        try {
            const eventState = await eventStateInteractorMongoDB.restoreEventState({eventStateRestore},{token, event_id, state_id});
            res.status(eventState.status).send(eventState)
        } catch (error) {
            throw error;
        }
       
    }
);



module.exports = router;