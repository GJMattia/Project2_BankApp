const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const beneficiarySchema = new Schema({
    name: {
        type: String
    },
    birthdate: {
        type: Date
    },
    phoneNumber: {
        type: String
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);