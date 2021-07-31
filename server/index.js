import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from "socket.io";

import adRoutes from './routes/ads.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';
import gameRoutes from './routes/games.js';
import sportRoutes from './routes/sports.js';

//initiate express to be able to call methods from.
const app = express();
dotenv.config();

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//use express to set the route path for app post routes
app.use('/ads', adRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/messages', messageRoutes);
app.use('/games', gameRoutes);
app.use('/sports', sportRoutes);

const PORT = process.env.PORT || 5000;

const primaryServer = mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

const io = new Server(primaryServer, {
});

io.on("connection", (socket) => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
        recipients,forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})