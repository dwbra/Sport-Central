
const updateAdWithFilled = (ad, adPosNumber) => {
    ad.filled[adPosNumber] = true
    return ad
};

export default updateAdWithFilled;