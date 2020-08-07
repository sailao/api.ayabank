import bcrypt from 'bcrypt'

const RegisterValidation = (req, res, next)=> next()

const Register = (app, db)=>{

    const RegisterController = (req, res)=>{
        var username = req.body.username;
        var password = req.body.password;
        // const SALT = process.env.SALT_KEY;
        const hash = bcrypt.hashSync(password, 8);

        db.collection('users').insertOne({
            username: username,
            password: hash
        },(err, user) => {
            if(err){
                console.log(err)
                res.json("Mongo Error")
            }
            db.close();
            res.json(user);
        });
    }

    app
    .route('/api/v1/register')
    .post(RegisterValidation, RegisterController);
}

export default Register;