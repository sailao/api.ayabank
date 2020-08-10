import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import mongodb from 'mongodb'
import register from './register.mjs'
import login from './login.mjs'
import jwt from 'jsonwebtoken'
import apolo from 'apollo-server-express'

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

    app.route('/api/v1/users').get((req, res)=>{

        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1]

            jwt.verify(authorization, 'secret', (err, user)=>{
                if(err)  console.log(err);

                if(user){
                    db.collection('users').find({}).toArray(function(err, result) {
                        if(err) {
                            return res.json("verifying error");
                        }
                        return res.json({
                            code: 200,
                            message: "success",
                            data: result
                        })
                    });
                }else{
                    res.status(401).send('unauthorized');
                }
            });
        }
        // return res.send(500);
    });

    // const typeDefs = apolo.gql`
    //     type Mutation {
    //         login: []
    //     }
    // `;

    // const resolver = {
    //     Query: {
    //         hello: () => { return 'Hello world!'; }
    //     },
    //     Mutation: {

    //     }
    // }

    // const server = new apolo.ApolloServer({typeDefs, resolver})

    // server.applyMiddleware({app})

    app.listen(SERVER_PORT, () => console.log(`Express server running at ${SERVER_PORT}`));
});
