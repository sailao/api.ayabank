import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const LoginValidation = (req, res, next)=> next();

const Login = (app, db)=>{

    const LoginController = (req, res)=>{
        var username = req.body.username;
        var password = req.body.password;

        db.collection("users").findOne({username}, (err, data)=> {
            console.log(data, username)
            if(!data){
                return res.status(404)
                .json({
                    "code": 404,
                    "message": "user not found."
                })
            }

            bcrypt.compare(password, data.password, (err, isMatch)=>{
                if(err){
                    res.redirect('/')
                }

                if(!isMatch){
                    res
                    .status(404)
                    .json({
                        "code": 404, 
                        "message": "password not match"
                    })
                }

                if(isMatch){
                    var token = jwt.sign(data, 'secret');
                    res
                    .json({
                        "code": 200, 
                        "message": "success",
                        "token": token
                    })
                }
            })
        });
    }
    
    app
    .route('/api/v1/login')
    .post(LoginValidation, LoginController);
}

export default Login;