
const updateAdWithFilled = (ad, adPosNumber) => {
    ad.filled[adPosNumber-1] = true
    return ad
};

export default updateAdWithFilled;