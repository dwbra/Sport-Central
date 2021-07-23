import mongoose from 'mongoose';

const sportsSchema = mongoose.Schema({
    sports: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Sports = mongoose.model('Sport', sportsSchema);

export default Sports;