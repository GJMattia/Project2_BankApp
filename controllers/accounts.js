const Account = require('../models/account');

module.exports = {
    index,
    newAccount,
    create,
    show
};


async function index(req, res){
    const accounts = await Account.find({});
    res.render('accounts/index', {title: 'My Accounts', accounts})
    res.render('accounts/index', {title: 'hello'})
};

function newAccount(req, res){
    res.render('accounts/new', {title: 'New Account Opening!'});
};

async function create(req, res){
    try{
        const account = await Account.create(req.body);

        res.redirect('/accounts');
    } catch (err){
        console.log(err);
    }
};

async function show(req, res){
    try {
        const account = await Account.findById(req.params.id);
        console.log(account);
        res.render('accounts/show', {title: 'hello', account})
    } catch(err) {
        console.error(err);
    };
};