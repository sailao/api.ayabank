const index = (req, res) => {
    res.send('login or register');
}

const store = (req, res) => {
    res.send('respond with a store'+req.body.title);
}


export default {index, store};