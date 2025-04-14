const { eventCreatePersistence } = require("../../use-cases/event/eventCreatePersistence");
const { eventGetAll } = require("../../use-cases/event/eventGetAll");
const { eventGetById } = require("../../use-cases/event/eventGetById");
const { eventDeleteById } = require("../../use-cases/event/eventDeleteById");
const { eventRestoreById } = require("../../use-cases/event/eventRestoreById");
const { eventGetByRequisitionId } = require("../../use-cases/event/eventGetByRequisitionId");
const { eventEdit } = require("../../use-cases/event/eventEdit");
const eventInteractorMongoDB = require("../../use-cases/event/eventInteractorMongoDB");
const router = require("express").Router();

/**
 * @api {post} /event/create Create an event
 * @apiName CreateEvent
 * @apiGroup Event
 *
 * @apiParam {String} name Name of the event
 * @apiParam {Date} start_date Start date of the event
 * @apiParam {Date} end_date End date of the event
 * @apiParam {String} description Description of the event
 * @apiParam {String} comment Comment about the event
 * @apiParam {String} requisition_id Requisition id of the event
 *
 * @apiSuccess {Object} event Created event
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X POST
 *     http://localhost:3000/event/create
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"name":"Test event","start_date":"2020-01-01","end_date":"2020-01-02","description":"This is a test event","comment":"This is a comment","requisition_id":"12345"}'
 */
router.route('/event/create').post(
    async (req, res) => {
        const {name, start_date, end_date, description, comment, requisition_id} = req.body;
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.create({eventCreatePersistence},{token, name, start_date, end_date, description, comment, requisition_id});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {put} /event/update Update an event
 * @apiName UpdateEvent
 * @apiGroup Event
 *
 * @apiParam {String} id Id of the event
 * @apiParam {String} name Name of the event
 * @apiParam {Date} start_date Start date of the event
 * @apiParam {Date} end_date End date of the event
 * @apiParam {String} description Description of the event
 * @apiParam {String} comment Comment about the event
 *
 * @apiSuccess {Object} event Updated event
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X PUT
 *     http://localhost:3000/event/update
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"id":"12345","name":"Updated event","start_date":"2020-01-01","end_date":"2020-01-02","description":"This is an updated event","comment":"This is an updated comment"}'
 */
router.route('/event/update').put(
    async (req, res) => {
        const {id, name, start_date, end_date, description, comment} = req.body;
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.update({eventEdit},{id, token, name, start_date, end_date, description, comment});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {get} /event/getAll Get all events
 * @apiName GetAllEvents
 * @apiGroup Event
 *
 * @apiSuccess {Array} events Array of events
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/getAll
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 */
router.route('/event/getAll').get(
    async (req, res) => {
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.getAll({eventGetAll},{token});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);
/**
 * @api {get} /event/getById Get an event by id
 * @apiName GetEventById
 * @apiGroup Event
 *
 * @apiParam {String} id Id of the event
 *
 * @apiSuccess {Object} event Event
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/getById
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"id":"12345"}'
 */
router.route('/event/getById').get(
    async (req, res) => {
        const {id} = req.body;
        
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.getById({eventGetById},{token, id});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {get} /event/requisition/get Get an event by requisition id
 * @apiName GetEventByRequisitionId
 * @apiGroup Event
 *
 * @apiParam {String} requisition_id Requisition id of the event
 *
 * @apiSuccess {Object} event Event
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/requisition/get
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"requisition_id":"12345"}'
 */
router.route('/event/requisition/get').get(
    async (req, res) => {
        const {requisition_id} = req.body;
        
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.getByRequisitionId({eventGetByRequisitionId},{token, requisition_id});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {put} /event/delete Delete an event
 * @apiName DeleteEvent
 * @apiGroup Event
 *
 * @apiParam {String} id Id of the event
 *
 * @apiSuccess {Object} event Deleted event
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X PUT
 *     http://localhost:3000/event/delete
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"id":"12345"}'
 */
router.route('/event/delete').put(
    async (req, res) => {
        const {id} = req.body;
        
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.deleteById({eventDeleteById},{token, id});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

/**
 * @api {put} /event/restore Restore an event
 * @apiName RestoreEvent
 * @apiGroup Event
 *
 * @apiParam {String} id Id of the event
 *
 * @apiSuccess {Object} event Restored event
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X PUT
 *     http://localhost:3000/event/restore
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"id":"12345"}'
 */
router.route('/event/restore').put(
    async (req, res) => {
        const {id} = req.body;
        
        const token = req.headers['token'];
        try {
            const event = await eventInteractorMongoDB.restoreById({eventRestoreById},{token, id});
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

module.exports = router;
