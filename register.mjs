import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const RegisterValidation = (req, res, next)=> next()

const Register = (app, db)=>{

    const RegisterController = (req, res)=>{
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;
        var address = req.body.address;
        const hashPassword = bcrypt.hashSync(password, 8);

        db.collection('users').insertOne({
            username: username,
            password: hashPassword,
            email: email,
            phone: phone,
            address: address
        },(err, user) => {
            if(err){
                console.log(err)
                return res.json("Mongo Error")
            }

            res
            .status(201)
            .json({
                "code": 201, 
                "message": "user created",
                "data": {
                    username: user.ops[0].username,
                    token: jwt.sign(user.ops[0], 'secret')
                }
            });
        });
    }

    app
    .route('/api/v1/register')
    .post(RegisterValidation, RegisterController);
}

export default Register;