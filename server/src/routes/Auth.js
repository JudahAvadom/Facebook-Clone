const Router = require('express').Router();

Router.post('/signup', (req,res) => {
    res.json("Hola")
})

module.exports = Router;