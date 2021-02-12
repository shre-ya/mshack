const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    picURL: String,
    ratingSum: { type: Number, default: 0 },
    ratedBy: { type: Number, default: 0 },
});

mongoose.model('msusers', userSchema);