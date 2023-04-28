const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)
const CONFIG = require('./config')
const mongoose = require('mongoose')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

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