const { stateGetAll } = require("../../use-cases/state/stateGetAll");
const { stateGetById } = require("../../use-cases/state/stateGetById");
const stateInteractorMongoDB = require("../../use-cases/state/stateInteractorMongoDB");
const router = require("express").Router();

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
router.route('/event/state/getById').get(
    async (req, res) => {
        const {id} = req.body;
        
        const token = req.headers['token'];
        try {
            const state = await stateInteractorMongoDB.getById({stateGetById},{token, id});
            res.status(state.status).send(state)
        } catch (error) {
            throw error;
        }
       
    }
);
module.exports = router;