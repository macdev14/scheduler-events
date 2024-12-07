const { eventTypeGetAll } = require("../../use-cases/event-type/eventTypeGetAll");
const { eventTypeGetById } = require("../../use-cases/event-type/eventTypeGetById");
const eventTypeInteractorMongoDB = require("../../use-cases/event-type/eventTypeInteractorMongoDB");
const router = require("express").Router();

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