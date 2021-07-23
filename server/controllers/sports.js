import Mongoose from 'mongoose';
import Sport from '../models/sports.js'

export const getSports = async (req, res) => {
    try {
        const Sports = await Sport.find();
        res.status(200).json(Sports);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};