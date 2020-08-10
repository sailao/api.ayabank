import React,{useRef} from 'react'

const styles = {
    container: {
        borderRadius: 5,
        width: 450,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(168, 162, 162, 0.5)',
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
    }
}

const Register = ({handleRegister})=> {

    var username = useRef();
    var password = useRef();
    var registerBtn = useRef();

    const registerAction = ()=> handleRegister(username.current.value, password.current.value, registerBtn)

    return (
        <div style={styles.container}>
            <h1>AYA iBanking</h1>
            User Name: <input style={styles.inputSize} ref={username} autoFocus type="text"/><br/>
            Password: <input style={styles.inputSize} ref={password} type="password"/><br/>
            <button style={styles.button} ref={registerBtn} onClick={registerAction}>REGISTER</button>
        </div>)
}

export default Register