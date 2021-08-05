import Mongoose from 'mongoose';
import AdListing from '../models/adListings.js'
import adListing from '../models/adListings.js'

// Async function for retrieving all ads from the AdListing model
// Successful reponse will send a status 200 along with the resulting object in json
export const getAds = async (req, res) => {
    try {
        const AdListings = await AdListing.find();
        res.status(200).json(AdListings);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

// Async function for retrieving a specific ad based on the ad id
// Successful reponse will send a status 200 along with the resulting ad in json
export const getAd = async (req,res) => {
    const {id} = req.params

    try {
        const ad = await AdListing.findById(id)

        res.status(200).json(ad)
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Creating an ad by assigning the ad as the request body
// Assigning the spread operator of the request data along with specified data types for the new ad
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

// Setting the id of the specific ad through the request params
// Using the findByIdAndUpdate operator to select the specific ad to be updated
// Use the spread operator to fill the form with previous ad details
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

// Setting the id of the specific ad through the request params
// Check if id is valid, and if so, find and delete the ad within the database
export const deleteAd = async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ad with that ${id}`);
    await AdListing.findByIdAndDelete(id);
    res.json({message: 'Ad deleted successfully.'});
};
