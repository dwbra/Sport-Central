import Mongoose from 'mongoose';
import Game from '../models/games.js'

export const getGames = async (req, res) => {
    try {
        const Games = await Game.find();
        res.status(200).json(Games);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const createGame = async (req, res) => {
    const data = req.body;
    const newGame = new Game({ ...data, creator: req.userID, createdAt: new Date().toISOString() });
    try {   
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(409).json({message: error})
    }
};

export const updateGame = async (req, res) => {
    const { id: _id } = req.params;
    const data = req.body;
    try {
        if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No ad with that ${_id}`);
        const updatedGame = await Game.findByIdAndUpdate(_id, { ...data, _id}, { new : true });
        res.json(updatedGame);
    } catch {
        res.status(409).json({message: error})
    }
};

export const deleteGame = async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ad with that ${id}`);
    await Game.findByIdAndDelete(id);
    res.json({message: 'Ad deleted successfully.'});
};