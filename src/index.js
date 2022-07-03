const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./routes/route');
const morgan = require('morgan');

const http = require('http').Server(app);

const { Server } = require('socket.io')

require('./configs/mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

route(app);


const port = process.env.PORT || 8080;

const server = http.listen(port, () => {
    console.log(`Server start on port ${port}`);
})

const io = new Server(server,{
    cors:{
        origin: 'https://adagaki-aki.herokuapp.com'
    }
})


global.onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('someone has connected!');
    socket.on('disconnect', () =>{
        console.log('someone disconnected!');
    })

    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on('send-msg', data => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            
            socket.to(sendUserSocket).emit('receive-msg', data.message);
            console.log(data);
        }
    })
})
