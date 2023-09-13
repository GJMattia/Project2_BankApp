const Account = require('../models/account');
const Beneficiary = require('../models/beneficiary');
module.exports = {
    index,
    newAccount,
    create,
    show
};


async function index(req, res){
    const accounts = await Account.find({});
    res.render('accounts/index', {title: 'My Accounts', accounts})
};

function newAccount(req, res){
    res.render('accounts/new', {title: 'New Account Opening!'});
};

async function create(req, res){
    try{
        await Account.create(req.body);

        res.redirect('/accounts');
    } catch (err){
        console.log(err);
    }
};

async function show(req, res){
    try {
        const account = await Account.findById(req.params.id);
        const beneficiaries = await Beneficiary.find({account: account._id});
        res.render('accounts/show', {title: 'hello', account, beneficiaries})
    } catch(err) {
        console.error(err);
    };
};