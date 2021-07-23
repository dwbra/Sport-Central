import mongoose from 'mongoose';

const adSchema = mongoose.Schema ({
    creator: String,
    teamName: String,
    filled: [Boolean],
    sport: String,
    compOrCasual: String,
    numberOfGames: Number,
    clubName: String,
    leagueName: String,
    skillLevel: String,
    mixedTeam: Boolean,
    playerGenders: [String],
    gamesDateTime: [Date],
    gamesLength: [Number],
    gamesLocation: {
        lat: [Number],
        lng: [Number]
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const adListing = mongoose.model('AdListing', adSchema);

export default adListing;