const { eventCreatePersistence } = require("../../use-cases/event/eventCreatePersistence");
const { eventGetAll } = require("../../use-cases/event/eventGetAll");
const { eventGetById } = require("../../use-cases/event/eventGetById");
const { eventDeleteById } = require("../../use-cases/event/eventDeleteById");
const { eventRestoreById } = require("../../use-cases/event/eventRestoreById");
const { eventGetByRequisitionId } = require("../../use-cases/event/eventGetByRequisitionId");
const { eventEdit } = require("../../use-cases/event/eventEdit");
const eventInteractorMongoDB = require("../../use-cases/event/eventInteractorMongoDB");
const router = require("express").Router();

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
