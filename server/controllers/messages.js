import Mongoose from 'mongoose';
import Message from '../models/messages.js'

export const getMessages = async (req, res) => {
    try {
        const Messages = await Message.find();
        res.status(200).json(Messages);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const createMessage = async (req, res) => {
    const data = req.body;
    const newMessage = new Message({ ...data, from: req.userId, createdAt: new Date().toISOString() });
    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({message: error})
    }
};

export const updateMessage = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;
    try {
        if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No message with that ${_id}`);
        const updatedMessage = await Message.findByIdAndUpdate(_id, { ...data, _id}, { new : true });
        res.json(updatedMessage);
    } catch {
        res.status(409).json({message: error})
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No message with that ${id}`);
    await Message.findByIdAndDelete(id);
    res.json({message: 'Ad deleted successfully.'});
};