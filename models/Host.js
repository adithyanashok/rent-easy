import mongoose from 'mongoose';
const { Schema } = mongoose;

const hostSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    address: {type: String, required: true,},
    password: {type: String, required: true},
    host: {type: Boolean, default: true},
    Location: {type: String, required: true},

}, {timestamps: true})

export default mongoose.model("Host", hostSchema)