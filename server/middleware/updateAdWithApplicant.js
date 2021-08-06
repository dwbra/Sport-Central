
const updateAdWithApplicant = (ad, applicantId, applicantName, applicantGender, applicantPosition) => {
    ad.applicantIds.push(applicantId)
    ad.applicantName.push(applicantName)
    ad.applicantGender.push(applicantGender)
    ad.applicantPosition.push(applicantPosition)

    return ad
};

export default updateAdWithApplicant;