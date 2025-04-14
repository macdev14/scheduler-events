//required app modules
const express = require("express");
const path = require("path");
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/apidocjs/swagger.json');
const { stateCreateStatesPersistence } = require("./use-cases/state/stateCreateStatesPersistence");
const { eventTypeCreateTypesPersistence } = require("./use-cases/event-type/eventTypeCreateTypesPersistence");
const stateInteractorMongoDB = require("./use-cases/state/stateInteractorMongoDB");
const eventTypeInteractorMongoDB = require("./use-cases/event-type/eventTypeInteractorMongoDB");
//--

const app = express();
let port=process.env.PORT || 3000;
let uri=process.env.MONGO_CONNECTION_STRING;

//database connection
mongoose.connect(uri).then(() => {
    console.log("Connected to the database");
    (async () => {
        try {
            const states = await stateInteractorMongoDB.createStates({stateCreateStatesPersistence}, {});
            console.log(states);
            const eventTypes = await eventTypeInteractorMongoDB.createEventTypes({eventTypeCreateTypesPersistence},{});
            console.log(eventTypes);
        } catch (err) {
            console.log("err", err);
        }
    })();
    
}).catch((err) => {
    console.log(err);
})
//
//middleware
app.use(bodyParser.json()); //parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //allowing for extended syntax (i.e. arrays, objects, nested objects, etc.)

//routes
app.use('/', express.static(path.join(__dirname, 'public'))); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //serve api documentation
app.use('/api-docjs', express.static('./public/apidocjs')); 
app.use("/api", require("./controllers/routes/eventRoute"));        //event route
app.use("/api", require("./controllers/routes/stateRoute"));        //state route
app.use("/api", require("./controllers/routes/eventTypeRoute"));    //eventType route
app.use("/api", require("./controllers/routes/eventStateRoute"));   //eventState route

app.get("/", (req, res) => {
    res.send("Hello, World!");
});
  

app.listen(port, () => {
    console.log("Server running on port: " + port);
})