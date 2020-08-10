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
    var email = useRef();
    var phone = useRef();
    var address = useRef();
    var registerBtn = useRef();

    const registerAction = ()=> handleRegister(username.current.value, password.current.value, email.current.value, phone.current.value, address.current.value, registerBtn)

    return (
        <div style={styles.container}>
            <h1>AYA iBanking</h1>
            User Name: <input style={styles.inputSize} required ref={username} autoFocus type="text"/><br/>
            Password: <input style={styles.inputSize} required ref={password} type="password"/><br/>
            Email: <input style={styles.inputSize} required ref={email} type="email"/><br/>
            Phone: <input style={styles.inputSize} required ref={phone} type="tel"/><br/>
            Address: <input style={styles.inputSize} required ref={address} type="text"/><br/>
            <button style={styles.button} ref={registerBtn} onClick={registerAction}>REGISTER</button>
        </div>)
}

export default Register