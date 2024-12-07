const { eventStateCreatePersistence } = require("../../use-cases/event-state/eventStateCreatePersistence");
const { eventStateGetAll } = require("../../use-cases/event-state/eventStateGetAll");
const { eventStateGetByIds } = require("../../use-cases/event-state/eventStateGetByIds");
const { eventStateGetEventById } = require("../../use-cases/event-state/eventStateGetEventById");
const { eventStateGetStateById } = require("../../use-cases/event-state/eventStateGetStateById");
const { eventStateDelete } = require("../../use-cases/event-state/eventStateDelete");
const { eventStateRestore } = require("../../use-cases/event-state/eventStateRestore");
const eventStateInteractorMongoDB = require("../../use-cases/event-state/eventStateInteractorMongoDB");
const router = require("express").Router();

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

//event_id and state_id needed
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