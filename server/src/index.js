const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express();
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin : "http://localhost:3000"
    }
})

const AuthRoutes = require('./routes/Auth');
const UserRoutes = require('./routes/User');
const UploadRoutes = require('./routes/Upload')

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

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/upload', UploadRoutes);

require('./socket')(io)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected')
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}).catch((err) => console.log(err))