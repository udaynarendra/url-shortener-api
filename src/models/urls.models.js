import mongoose from "mongoose";
const originalUrl = {
    type: String,
    trim: true,
    required: true
};
const shortCode = {
    type: String,
    trim: true,
    unique: true,
    required: true
}
const urlSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url: [
        {
            originalUrl
            , shortCode
        }
    ]
}, { timestamps: true })
const Url = mongoose.model('Url', urlSchema);
export default Url;