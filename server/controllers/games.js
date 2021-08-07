import Mongoose from 'mongoose';
import Game from '../models/games.js'
import AdListing from '../models/adListings.js'
import User from '../models/users.js'
import creatingGames from '../middleware/creatingGames.js'
import updateAdWithFilled from '../middleware/updateAdWithFilled.js'

// Async function in the server to find all games in the database
// Then takes the Games object in json as a response
export const getGames = async (req, res) => {
    try {
        const Games = await Game.find();
        res.status(200).json(Games);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

// Destructures id to be the params of the request
// Assignes a variable game after finding a game by the id in the request
export const getGame = async (req,res) => {
    const {id} = req.params

    try {
        const game = await Game.findById(id)

        res.status(200).json(game)
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createGame = async (req, res) => {
    const adId = req.body.adId;
    const playerId = req.body.playerId;
    const adPosNumber = req.body.adPosNumber;
    //console.log("Creating games from ad: ", adId)
    //console.log("Creating games to player : ", playerId)

    //### get ad from passed info.
    const ad = await AdListing.findById(adId)
    //console.log("ad: ", ad)

    //### get player user info from passed info.
    const player = await User.findById(playerId)
    //console.log("player: ", player)

    //### send ad and players info to function (creatingGames) in the middleware.
    //### The creatingGames function will return and array of all the games to be created. 
    const gamesResult = creatingGames(ad, player, adPosNumber)
    //console.log("creatingGames result : ", gamesResult)

    // create to new games from the gamesResult array.
    //console.log("Game info",gamesResult)
    if (gamesResult[0] !== 'error wrong Ad Position Number') {
        for(var i = 0; i < gamesResult.length; i++) {
            const newGame = new Game(gamesResult[i]);
            await newGame.save()
        }
        // update the AdListing filled on the at and the AdListing
        const adUpdated = updateAdWithFilled(ad, adPosNumber)
        const _id = adUpdated._id
        const updatedAd = await AdListing.findByIdAndUpdate(_id, { ...adUpdated, _id}, { new : true });
    } else {
        res.status(409).json({message: gamesResult[0]})
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