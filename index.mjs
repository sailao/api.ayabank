import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import apiRouter from './apiRouter.mjs'

env.config();

const SERVER_PORT = process.env.SERVER_PORT;

var app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.get('/', (req, res)=> res.json('Welcome'))

    apiRouter(app);

app.listen(SERVER_PORT || 8000, () => console.log(`Express server running at ${SERVER_PORT}`));