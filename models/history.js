const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const historySchema = new Schema({
    transactionDate: {
        type: Date
    },
    transactionDescription: {
        type: String,
    },
    transactionType: {
        type: String
    },
    transactionAmount: {
        type: Number
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    balance: {
        type: Number
    }
});

module.exports = mongoose.model('History', historySchema);