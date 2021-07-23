import mongoose from 'mongoose';

const messageSchema = mongoose.Schema ({
    dateTimeSent: Date,
    from: String,
    to: String,
    content: String,
    toHasRead: Boolean,
    adConnection: Number,
    gameConnection: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Messages = mongoose.model('Message', messageSchema);

export default Messages;