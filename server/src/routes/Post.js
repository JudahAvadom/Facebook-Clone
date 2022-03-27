const Router = require('express').Router();
const { createPost } = require('../controllers/Post/postAction');
const authRequired = require("../middleware/AuthRequired")

Router.post('/', authRequired, createPost)

module.exports = Router;