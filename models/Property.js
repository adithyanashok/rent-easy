import mongoose from 'mongoose';
const { Schema } = mongoose;

const propertySchema = new Schema({
    userId: {type:String, required: true},
    PropertyName: {type: String, required: true},
    PropertyAmount: {type: Number, required: true},
    PropertyState: {type: String, required: true},
    PropertyDistrict: {type: String, required: true},
    PropertyCity: {type: String, required: true},
    PropertyAddress: {type: String, required: true},
    Timespan: {type: Array, required: true},
    Bedrooms: {type: String, required: true},
    Bathrooms: {type: String, required: true},
    OwnerName: {type: String, required: true},
    OwnerPhone: {type: String, required: true},
    OwnerEmail: {type: String, required: true},
    Image1: {type: String},
    Image2: {type: String},
    Image3: {type: String},

}, {timestamps: true})

export default mongoose.model("Property", propertySchema)

