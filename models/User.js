import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, },
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    password: {type: String, },
    address: {type: String, },
    host: {type: Boolean, default: false},
    profile: {type: String},
    state: {type: String},
    city: {type: String},

}, {timestamps: true})

export default mongoose.model("User", userSchema)