const Router = require('express').Router();
const SignupUser = require('../controllers/Auth/Signup')
const LoginUser = require('../controllers/Auth/Login')

Router.post('/signup', SignupUser)
Router.post('/login', LoginUser)

module.exports = Router;