const Account = require('../models/account');
const Beneficiary = require('../models/beneficiary');

module.exports = {
    new: newBeneficiary,
    create,
    delete: deleteBeneficiary,
    update,
    updateBeneficiary
};

async function updateBeneficiary(req, res) {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id);
        beneficiary.name = req.body.name;
        beneficiary.address = req.body.address;
        beneficiary.birthdate = req.body.birthdate;
        await beneficiary.save();
        res.redirect(`/accounts/${beneficiary.account}`);
    } catch (err) {
        console.log(err);
    };
};

async function update(req, res) {
    function formatDate(date) {
        return date.getFullYear() +
            '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) +
            '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
    }
    const beneficiary = await Beneficiary.findById(req.params.id);
    res.render('beneficiaries/update', { title: 'Update Beneficiary', beneficiary, formatDate });
};

async function newBeneficiary(req, res) {
    const account = await Account.findById(req.params.id);
    res.render('beneficiaries/new', { title: 'New Beneficiary', account });
};

async function create(req, res) {
    const accountId = req.params.id;
    const { name, birthdate, address } = req.body;

    try {
        const beneficiary = new Beneficiary({
            account: accountId,
            name,
            address,
            birthdate: new Date(birthdate).getTime()
        });
        await beneficiary.save();
        res.redirect(`/accounts/${accountId}`);
    } catch (err) {
        console.error(err);
    };
};

async function deleteBeneficiary(req, res) {
    const beneficiaryId = req.params.id;
    try {
        const beneficiary = await Beneficiary.findById(beneficiaryId);
        const accountId = beneficiary.account;
        await Beneficiary.findByIdAndRemove(beneficiaryId);
        res.redirect(`/accounts/${accountId}`);
    } catch (err) {
        console.error(err)
    };
};






