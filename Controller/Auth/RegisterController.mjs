
const store = (req, res) => {
    res.send('respond with a store'+req.body.title);
}


export default {index, store};