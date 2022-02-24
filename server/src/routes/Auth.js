const Router = require('express').Router();
const SignupUser = require('../controllers/Auth/Signup')
const LoginUser = require('../controllers/Auth/Login')
const Logout = require('../controllers/Auth/Logout')
const authRequired = require("../middleware/AuthRequired")

Router.post('/signup', SignupUser)
Router.post('/login', LoginUser)
Router.get("/logout",authRequired,Logout)

module.exports = Router;