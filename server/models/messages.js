import mongoose from 'mongoose';

const messageSchema = mongoose.Schema ({
    from: {type: String, required: true},
    to: {type: String, required: true},
    content: {type: String, required: true},
    toHasRead: {type: Boolean, required: true},
    adConnection: {type: Number, required: false},
    gameConnection: {type: Number, required: false},
}, { timestamps: true });

const Messages = mongoose.model('Message', messageSchema);

export default Messages;