const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accountSchema = new Schema({
    accountType: {
        type: String,
        required: true,
        enum: ['Checking', 'Saving']
    },
    accountNumber: {
        type: Number
    },
    balance: {
        type: Number,
        min: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);