const Account = require('../models/account');
const Beneficiary = require('../models/beneficiary');

module.exports = {
    new: newBeneficiary,
    create
};


async function newBeneficiary(req, res){
    const account = await Account.findById(req.params.id);
    res.render('beneficiaries/new', {title: 'New Beneficiary', account});
};


async function create(req, res){
    const accountId = req.params.id;
    const { name, birthdate } = req.body;

    try{
        const beneficiary = new Beneficiary({
            account: accountId,
            name,
            birthdate
        });
        await beneficiary.save();
        console.log('good');
       
        res.redirect(`/accounts/${accountId}`);
    } catch (err) {
        console.error(err);
    };
};







