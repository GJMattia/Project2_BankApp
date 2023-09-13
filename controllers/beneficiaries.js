const Account = require('../models/account');
const Beneficiary = require('../models/beneficiary');

module.exports = {
    new: newBeneficiary,
    create,
    delete: deleteBeneficiary
};


async function newBeneficiary(req, res){
    const account = await Account.findById(req.params.id);
    res.render('beneficiaries/new', {title: 'New Beneficiary', account});
};


async function create(req, res){
    const accountId = req.params.id;
    const { name, birthdate, address } = req.body;

    try{
        const beneficiary = new Beneficiary({
            account: accountId,
            name,
            address,
            birthdate
        });
        await beneficiary.save();
        console.log('good');
       
        res.redirect(`/accounts/${accountId}`);
    } catch (err) {
        console.error(err);
    };
};

async function deleteBeneficiary(req, res){
    const beneficiaryId = req.params.id;
    try{
        const beneficiary = await Beneficiary.findById(beneficiaryId);
        const accountId = beneficiary.account;
        await Beneficiary.findByIdAndRemove(beneficiaryId);
        res.redirect(`/accounts/${accountId}`);
    }catch(err){
        console.error(err)
    };
};






