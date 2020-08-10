import React,{useRef} from 'react'
import {Link} from 'react-router-dom'

const styles = {
    container: {
        borderRadius: 5,
        width: 450,
        display: 'flex',
        flexDirection: 'column',
        background: "rgba(168, 162, 162, 0.5)",
        padding: 20,
        margin: '100px auto'
    },
    inputSize: {
        height: 35
    },
    button: {
        height: 50,
        background: '#a02226',
        color: 'white',
        fontSize: '100%',
        border: 'none',
        cursor: 'pointer',
        margin: '0 0 10px 0',
        textDecoration: 'none'
    },
    textRed: {
        color: 'red'
    }
}

const Login = ({handleLogin})=> {
    var username = useRef();
    var password = useRef();
    var loginRef = useRef();

    const loginAction = ()=> handleLogin(username.current.value, password.current.value, loginRef)
    
    return (
        <div style={styles.container}>
            <h1>AYA iBanking</h1>
            User Name: <input style={styles.inputSize} ref={username} autoFocus type="text"/>
            <i><small style={styles.textRed}>user not found</small></i>
            <br/>
            
            Password: <input style={styles.inputSize} ref={password} type="password"/>
            <i><small style={styles.textRed}>password not match</small></i>
            <br/>
            <button style={styles.button} onClick={loginAction} ref={loginRef}>
                LOGIN
            </button>
            <button style={styles.button}>
                <Link to="/register" style={styles.button}>
                    REGISTER 
                </Link>
            </button>
        </div>)
}

export default Login