import mongoose from 'mongoose';

const gameSchema = mongoose.Schema ({
    creator: String,
    player: String,
    teamName: String,
    sport: String,
    compOrCasual: String,
    numberOfGames: Number,
    clubName: String,
    leagueName: String,
    skillLevel: String,
    mixedTeam: Boolean,
    gamesDateTime: Date,
    gamesLength: Number,
    gamesLocation: {
        lat: Number,
        lng: Number
    }
});

const Games = mongoose.model('Game', gameSchema);

export default Games;