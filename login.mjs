import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const LoginValidation = (req, res, next)=> next();

const Login = (app, db)=>{

    const LoginController = (req, res)=>{
        var username = req.body.username;
        var password = req.body.password;
        
        // db.collection("users").findOne({username}, (err, data)=> {
        //     console.log(data, req.body.username)
        //     db.close()
        //     res.json(data)
        // })
        db.collection("users").findOne({username}, (err, data)=> {
            if(!data){
                res.json({
                    "code": 404,
                    "message": "user not found."
                })
            }

            bcrypt.compare(password, data.password, (err, isMatch)=>{
                if(err){
                    res.redirect('/')
                }
                if(!isMatch){
                    res.json(404)
                }
                if(isMatch){
                    var token = jwt.sign(data, 'secret');
                    res.json({"token": token})
                }
            })
        });
        // if(username && password){
        //     var token = jwt.sign({username, password}, 'secret');
        //     res.json(token)
        // }
        // res.json("error")
    }
    
    app
    .route('/api/v1/login')
    .post(LoginValidation, LoginController);
}

export default Login;