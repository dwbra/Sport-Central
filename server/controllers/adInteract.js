import Mongoose from 'mongoose';
import AdListing from '../models/adListings.js'
import adListing from '../models/adListings.js'
import updateAdWithApplicant from '../middleware/updateAdWithApplicant.js'


export const applyForPosition = async (req, res) => {
    //console.log("From applyForPosition on ads controller ", req.body)

    //get ad by id
    const _id = req.body.adId
    const ad = await AdListing.findById(_id)

    // pass info to middleware
    
    const adUpdated = updateAdWithApplicant(ad, req.body.applicantId, req.body.applicantName, req.body.applicantGender, req.body.applicantPosition)

    // update ad
    const updatedAd = await AdListing.findByIdAndUpdate(_id, { ...adUpdated, _id}, { new : true });
    
}