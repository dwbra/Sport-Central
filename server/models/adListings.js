import mongoose from 'mongoose';

// Schema for an ad
const adSchema = mongoose.Schema ({
    creatorId: {type: String, required: true},
    creatorEmail: {type: String, required: true},
    teamName: {type: String, required: true},
    name: {type: String, required: true},
    filled: {type: [Boolean], required: true},
    sport: {type: String, required: true},
    compOrCasual: {type: String, required: true},
    numberOfGames: {type: Number, required: true},
    clubName: String,
    leagueName: String,
    skillLevel: {type: String, required: true},
    teamGender: {type: String, required: true},
    playerGenders: {type: [String], required: true},
    gamesDateTime: {type: [String], required: true},
    gameLength:{type: Number, required: true},
    gamesLocationLat: { type: [Number], required: true},
    gamesLocationLng: { type: [Number], required: true},
    creatorComment: {type: String, required: false},
    applicantIds: {type: [String], required: false},
    applicantName: {type: [String], required: false},
    applicantGender: {type: [String], required: false},
    applicantPosition: {type: [String], required: false},
}, { timestamps: true });

const AdListing = mongoose.model('AdListings', adSchema);

export default AdListing;