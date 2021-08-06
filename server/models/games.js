import mongoose from 'mongoose';

const gameSchema = mongoose.Schema ({
    creatorId: {type: String, required: true},
    creatorEmail: {type: String, required: true},
    playerId: {type: String, required: true},
    playerEmail: {type: String, required: true},
    teamName: {type: String, required: true},
    sport: {type: String, required: true},
    compOrCasual: {type: String, required: true},
    clubName: {type: String, required: false},
    leagueName: {type: String, required: false},
    skillLevel: {type: String, required: true},
    teamGender: {type: String, required: true},
    gamesDateTime: {type: String, required: true},
    gamesLength: { type: Number, required: true},
    gamesLocationLat: { type: Number, required: true},
    gamesLocationLng: { type: Number, required: true},
    creatorComment: {type: String, required: false},  
}, { timestamps: true });

const Games = mongoose.model('Game', gameSchema);

export default Games;