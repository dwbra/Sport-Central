import mongoose from 'mongoose';

const userSchema = mongoose.Schema ({
    userID: String,
    name: String,
    icon: String,
    adSearchHistory: [Number],
    activeAdIDs: [Number],
    activeGameIDs: [Number],
    lastCoordinates: {
        lat: Number,
        lng: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('Users', userSchema);

export default User;