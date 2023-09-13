const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountType: {
        type: String,
        required: true,
        enum: ['Checking', 'Savings']
    },
    accountNumber: {
        type: Number
    },
    balance: {
        type: Number,
        min: 0
    },
    overdraft: {
        type: Boolean
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);