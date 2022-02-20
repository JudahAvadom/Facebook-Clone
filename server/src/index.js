const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express();
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 5000
const {MONGODB_URI} = require("./config")

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    io.req = req
    req.io = io
    next()
})

require('./socket')(io)

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected')
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    })
    .catch((err) => console.log(err))