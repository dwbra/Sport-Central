import Mongoose from 'mongoose';
import User from '../models/users.js'

export const getUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const createUser = async (req, res) => {
    const data = req.body;
    const newUser = new User({ ...data, createdAt: new Date().toISOString() });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error})
    }
};

export const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;
    try {
        if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with that ${_id}`);
        const updatedUser = await User.findByIdAndUpdate(_id, { ...data, _id}, { new : true });
        res.json(updatedUser);
    } catch {
        res.status(409).json({message: error})
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with that ${id}`);
    await User.findByIdAndDelete(id);
    res.json({message: 'Ad deleted successfully.'});
};