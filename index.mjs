import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import mongodb from 'mongodb'
import register from './register.mjs'
import login from './login.mjs'

env.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;
const DB_CONNECTION = process.env.DB_CONNECTION;

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongodb.MongoClient.connect(DB_CONNECTION, (err, db)=>{
    if(err) console.log('Database error: ' + err);

    app.get('/', (req, res)=> res.json('Welcome'));

    login(app, db);

    register(app, db);

    app.listen(SERVER_PORT, () => console.log(`Express server running at ${SERVER_PORT}`));
});
