import express from 'express'
import env from 'dotenv'

if (process.env.NODE_ENV !== 'production') env.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;

var app = express();
    app.get('/', (req, res)=> res.json('Welcome'))

app.listen(SERVER_PORT, () => console.log(`Express server running at ${SERVER_PORT}`));