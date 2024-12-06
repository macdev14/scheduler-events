const { eventCreatePersistence } = require("../../use-cases/event/eventCreatePersistence");
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
)


module.exports = router;
