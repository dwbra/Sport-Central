


const creatingGames = (ad, player, adPosNumber) => {
    let  gameNumber = []

    if (adPosNumber <= ad.filled.length) {
        if (ad.filled[adPosNumber] === false) {
            for(var i = 0; i < ad.numberOfGames; i++) {
                console.log("Game created for ", player, "  Game number:", i)
                if (ad.gamesLocationLat.length === 1) {
                    gameNumber.push({
                        creatorId: ad.creatorId,
                        creatorEmail: ad.creatorEmail, 
                        playerId: player._id,
                        playerEmail: player.email,
                        teamName: ad.teamName,
                        sport: ad.sport,
                        compOrCasual: ad.compOrCasual,
                        clubName: ad.clubName,
                        leagueName: ad.leagueName,
                        skillLevel: ad.skillLevel,
                        teamGender: ad.teamGender,
                        gamesDateTime: ad.gamesDateTime[i],
                        gamesLength: ad.gameLength,
                        gamesLocationLat: ad.gamesLocationLat[0],
                        gamesLocationLng: ad.gamesLocationLng[0],
                        creatorComment: ad.creatorComment, 
                    })
                } else {
                    gameNumber.push({
                        creatorId: ad.creatorId,
                        creatorEmail: ad.creatorEmail, 
                        playerId: player._id,
                        playerEmail: player.email,
                        teamName: ad.teamName,
                        sport: ad.sport,
                        compOrCasual: ad.compOrCasual,
                        clubName: ad.clubName,
                        leagueName: ad.leagueName,
                        skillLevel: ad.skillLevel,
                        teamGender: ad.teamGender,
                        gamesDateTime: ad.gamesDateTime[i],
                        gamesLength: ad.gameLength,
                        gamesLocationLat: ad.gamesLocationLat[i],
                        gamesLocationLng: ad.gamesLocationLng[i],
                        creatorComment: ad.creatorComment, 
                    })
                }
            }
        } else {
            gameNumber[0] = "error wrong Ad Position Number" 
        }
    } else {
        gameNumber[0] = "error wrong Ad Position Number" 
    }
    
    return gameNumber
};

export default creatingGames;