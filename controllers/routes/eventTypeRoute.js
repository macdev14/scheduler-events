const { eventTypeGetAll } = require("../../use-cases/event-type/eventTypeGetAll");
const { eventTypeGetById } = require("../../use-cases/event-type/eventTypeGetById");
const eventTypeInteractorMongoDB = require("../../use-cases/event-type/eventTypeInteractorMongoDB");
const router = require("express").Router();

/**
 * @api {get} /event/eventType/getAll Get all eventTypes
 * @apiName GetAllEventTypes
 * @apiGroup Event Type
 *
 * @apiSuccess {Array} eventTypes Array of eventTypes
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/eventType/getAll
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 */
router.route('/event/eventType/getAll').get(
    async (req, res) => {
        const token = req.headers['token'];
        try {
            const eventType = await eventTypeInteractorMongoDB.getAll({eventTypeGetAll},{token});
            res.status(eventType.status).send(eventType)
        } catch (error) {
            throw error;
        }
       
    }
);
/**
 * @api {get} /event/eventType/getById Get eventType by id
 * @apiName GetEventTypeById
 * @apiGroup Event Type
 *
 * @apiParam {Number} id Event type id
 *
 * @apiSuccess {Object} eventType Event type
 *
 * @apiError {String} message Error message
 *
 * @apiHeader {String} token User's token
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET
 *     http://localhost:3000/event/eventType/getById
 *     -H 'Content-Type: application/json'
 *     -H 'token: XXXXXXX'
 *     -d '{"id": 12345}'
 */
router.route('/event/eventType/getById').get(
    async (req, res) => {
        const {id} = req.body;
        
        const token = req.headers['token'];
        try {
            const eventType = await eventTypeInteractorMongoDB.getById({eventTypeGetById},{token, id});
            res.status(eventType.status).send(eventType)
        } catch (error) {
            throw error;
        }
       
    }
);
module.exports = router;