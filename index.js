const express = require('express');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
app.set('view engine', 'ejs')
app.get('/*', (req, res) => {
    res.render('home')
})
let users = []
server.listen(3001, () => {
    console.log("Server is running...");
})
io.on('connection', (socket) => {
    users.push(socket.id)
    console.log(`User connected ${socket.id} `);
    socket.on('message', (data) => {
        console.log(`${socket.id} just sent : ${data?.content}`)
    })
    socket.on('admin', (data) => {

        if (data.key === 'achraf')
            socket.emit('admin', { users: JSON.stringify(users) })
    })
})