const Router = require('express').Router();
const { me } = require('../controllers/User/FetchUser');
const { updateProfilePic } = require('../controllers/User/UserAction');
const AuthRequired = require('../middleware/AuthRequired');

Router.get('/me', AuthRequired, me);
Router.put('/profile_pic/update', AuthRequired, updateProfilePic);

module.exports = Router;