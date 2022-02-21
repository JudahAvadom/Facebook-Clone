const Router = require('express').Router();
const { me } = require('../controllers/User/FetchUser');
const AuthRequired = require('../middleware/AuthRequired');

Router.get('/me', AuthRequired, me)

module.exports = Router;