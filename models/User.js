import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    host: {type: Boolean, default: false},
    Location: {type: String, required: true},
    PreferredLocation: {type: String},

}, {timestamps: true})

export default mongoose.model("User", userSchema)