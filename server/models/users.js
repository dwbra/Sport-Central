import mongoose from 'mongoose';

// Schema for a user
const userSchema = mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, unique: true},
  });

const User = mongoose.model('Users', userSchema);

export default User;