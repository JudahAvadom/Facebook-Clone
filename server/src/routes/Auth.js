const Router = require('express').Router();
const SignupUser = require('../controllers/Auth/Signup')

Router.post('/signup', SignupUser)

module.exports = Router;