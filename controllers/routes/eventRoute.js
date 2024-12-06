const { eventCreatePersistence } = require("../../use-cases/event/eventCreatePersistence");
const { eventGetAll } = require("../../use-cases/event/eventGetAll");
const { eventGetById } = require("../../use-cases/event/eventGetById");
const eventInteractorMongoDB = require("../../use-cases/event/eventInteractorMongoDB");
const router = require("express").Router();

router.route('/event/create').post(
    async (req, res) => {
        const {name, start_date, end_date, description, comment} = req.body;
        const token = req.headers['token'];
        try {
           
            const event = await eventInteractorMongoDB.create({eventCreatePersistence},{token, name, start_date, end_date, description, comment});
            //console.log(event)
            res.status(event.status).send(event)
        } catch (error) {
            throw error;
        }
       
    }
);

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

module.exports = router;
