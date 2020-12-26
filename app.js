const { request, response } = require("express");
const express = require("express");
const bodyParser = require('body-parser')
const Postgres = require("./src/helpers/postgres");
const validateEmail = require("./src/helpers/validateEmail");
const validateText = require("./src/helpers/validateText");
const Redis = require("./src/helpers/redis");
require('dotenv').config();

const {
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PORT,
    POSTGRES_PASSWORD,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
} = process.env;

const postgresConfig = {
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    ssl: {
        rejectUnauthorized: false,
    },
}

const redisConfig = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
}

const postgres = new Postgres(postgresConfig);
postgres.connect();

const redis = new Redis(redisConfig);
redis.connect();

const app = express();

app.use(express.static("public"));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

app.get("/",(request,response)=>{
    response.send("Hello Loha")
});

app.get("/feedbackList", async (request, response) => {
    const feedbackList = 
    await postgres.multiple(
    `select * from feedback;`,
    []);

    response.send(feedbackList);
})

app.get("/workingTime", async (request, response) => {
    try {
        const redisResponse = JSON.parse(await redis.get('workingTime'))
        response.send({workingTime: redisResponse})
    } catch (error) {
        response.status(500).send(`Error ${error.message}`);
    }

})

app.post("/updateWorkingTime", async (request, response) => {
    try {
        const {
            workingTime, 
        } = request.body;
        await redis.set('workingTime', workingTime)
        response.send({message: 'workingTime updated successfuly!'})
    } catch (error) {
        response.status(500).send(`Error ${error.message}`);
    }
})

app.post("/createFeedback", async (request, response) => {
    try{
        const {
            email, 
            feedback,
        } = request.body;

        if(!validateEmail(email)){
            response.status(500).send({error: 'Invalid email!'});
            return;
        }

        if(!validateText(feedback)){
            response.status(500).send({error: 'Invalid text: too long!'});
            return;
        }

        await postgres.single(
            `
            insert into feedback(email, feedback)
            values('${email}', '${feedback}');
            `,
            []);
        const feedbackList = 
        await postgres.multiple(
        `select * from feedback;`,
        []);

        response.send(feedbackList);
    }
    catch(error) {
        response.status(500).send(`Error ${error.message}`);
    }
})

app.listen(3000, () => console.log('App listening on port 3000.'))
