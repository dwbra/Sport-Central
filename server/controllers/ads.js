import Mongoose from 'mongoose';
import adListing from '../models/adListings.js';
import AdListing from '../models/adListings.js'

export const getAds = async (req, res) => {
    try {
        const AdListings = await AdListing.find();
        res.status(200).json(AdListings);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const getAd = async (req,res) => {
    const {id} = req.params

    try {
        const ad = await adListing.findById(id)

        res.status(200).json(ad)
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createAd = async (req, res) => {
    const ad = req.body;
    const newAdListing = new AdListing({ ...ad, creator: req.userId, createdAt: new Date().toISOString() });
    try {   
        await newAdListing.save();
        res.status(201).json(newAdListing);
    } catch (error) {
        res.status(409).json({message: error})
    }
};

export const updateAd = async (req, res) => {
    const { id: _id } = req.params;
    const ad = req.body;
    try {
        if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No ad with that ${_id}`);
        const updatedAd = await AdListing.findByIdAndUpdate(_id, { ...ad, _id}, { new : true });
        res.json(updatedAd);
    } catch {
        res.status(409).json({message: error})
    }
}

export const deleteAd = async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ad with that ${id}`);
    await AdListing.findByIdAndDelete(id);
    res.json({message: 'Ad deleted successfully.'});
};