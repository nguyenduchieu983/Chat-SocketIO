const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)
const CONFIG = require('./config')
const mongoose = require('mongoose')
const home = require('./routes/home')
const bodyParser = require('body-parser')
const sessions = require('express-session')

/**using pkg */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "chatsocketio",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

/**Route */
app.use('/', home)

/**Socket IO */
io.on('connection', (socket) => {
    console.log('a user connected')
    if (socket.on('disconnect', () => {
        console.log('user disconnect');
    }));
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg)
    })
})

/**Connect mongoDB */
mongoose.connect(CONFIG.MONGO_URI, { maxPoolSize: 10 }).then(() => {
    console.log("Connected mongoDb");
}).catch(err => {
    console.log(`Connect mongoDB fail: ${err}`);
})

server.listen(CONFIG.PORT, () => {
    console.log(`listening on *:${CONFIG.PORT}`);
});