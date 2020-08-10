import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/login'
import RegisterForm from './components/register'

const App = ()=> {
    const [auth, setAuth] = useState({token: false});

    const handleLogin = (username, password, loginBtn)=>{
        if(loginBtn.current){
            loginBtn.current.setAttribute("disabled", "disabled");
          }

        fetch('http://localhost:9000/api/v1/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 404){
                loginBtn.current.removeAttribute("disabled");
                console.log(json)
                alert("Auth fail");
            }
            if(json.code === 422){
                loginBtn.current.removeAttribute("disabled");
                console.log(json)
                alert("Auth fail");
            }
            if(json.code === 200){
                setAuth({token: json.token})
            }
        }).catch(err=>console.log(err))
    }

    const handleRegister = (username, password, registerBtn)=>{
        if(registerBtn.current){
            registerBtn.current.setAttribute("disabled", "disabled");
          }

        fetch('http://localhost:9000/api/v1/register', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, password
            })
        }).then(res => {
            if(!res.ok) alert("Register fail");
            return res.json();
        }).then(json => {
            if(json.code === 201){
                setAuth({token: json.data.token});
                return;
            }
            registerBtn.current.removeAttribute("disabled");
            console.log(json)
            alert("Register fail");
        }).catch(err=>console.log(err))
    }

    const Home = ()=> {
        const [users, setUsers] = useState([]);

        useEffect( ()=>{
            const getUsers = async ()=>{
                fetch('http://localhost:9000/api/v1/users', {
                    method: 'get',
                    headers: { 
                        'Authorization': 'Bearer ' + auth.token
                    }
                })
                .then(res=>res.json())
                .then(json=>setUsers(json.data))
                .catch(err=>console.log(err));
            }

            getUsers();

        },[]);

        return <div>
            <h1>Admin Dashboard</h1>
            <button onClick={()=>setAuth({token: false})}>Logout</button>
            <table>
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {users && users.map(({username}, key)=><tr key={key}>
                    <td>{username}</td>
                    <td>{username}</td>
                    <td>{username}</td>
                    <td>{username}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    }
    const Login = ()=> <LoginForm handleLogin={handleLogin}/>
    const Register = ()=> <RegisterForm handleRegister={handleRegister}/>

    return (
        <Router>
            <Route path="/" exact render={() => auth.token ? <Home/> : <Redirect to="/login" /> } />
            <Route path="/register" render={() => auth.token ? <Redirect to="/" /> : <Register/> }/>
            <Route path="/login" render={() => auth.token ? <Redirect to="/" /> : <Login /> }/>
        </Router>)
}

ReactDOM.render(<App/>, document.getElementById('root'))