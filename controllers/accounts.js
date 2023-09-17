const Account = require('../models/account');
const Beneficiary = require('../models/beneficiary');

module.exports = {
    index,
    newAccount,
    create,
    show,
    transfer,
    transferCash,
    deleteAccount
};

async function deleteAccount(req, res) {
    const accountId = req.params.id;
    await Account.findByIdAndRemove(accountId);
    res.redirect('/accounts');
};

async function transferCash(req, res) {
    try {
        const fromAccountId = req.body.fromAccount;
        const toAccountId = req.body.toAccount;
        const transferAmount = parseFloat(req.body.transferAmount);
        const fromAccount = await Account.findOne({ _id: fromAccountId });
        const toAccount = await Account.findOne({ _id: toAccountId });

        if (fromAccountId === toAccountId) {
            return res.render('transfer/transfer', {
                title: 'Account Transfers',
                accounts: await Account.find({}),
                error: 'Error! You must select 2 different accounts!'
            });
        };

        if (fromAccount.balance < transferAmount) {
            return res.render('transfer/transfer', {
                title: 'Account Transfers',
                accounts: await Account.find({}),
                error: 'Error! Insufficient balance!',
                success: null
            });
        };

        fromAccount.balance -= transferAmount;
        toAccount.balance += transferAmount;
        await fromAccount.save();
        await toAccount.save();
        return res.render('transfer/transfer', {
            title: 'Account Transfers',
            accounts: await Account.find({}),
            error: null,
            success: `Transfer of $${transferAmount} complete!`
        });
    } catch (err) {
        console.error(err);
    };
};

async function transfer(req, res) {
    let error = null;
    let success = null;
    const accounts = await Account.find({});
    res.render('transfer/transfer', { title: 'Account Transfers', accounts, error, success });
};

async function index(req, res) {
    const accounts = await Account.find({});
    res.render('accounts/index', { title: 'My Accounts', accounts })
};

function newAccount(req, res) {
    let generateAccountNumber = Math.floor(100000000 + Math.random() * 900000000);
    res.render('accounts/new', { title: 'New Account Opening!', generateAccountNumber });
};

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        await Account.create(req.body);

        res.redirect('/accounts');
    } catch (err) {
        console.log(err);
    };
};

async function show(req, res) {
    function formatDate(date) {

        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) +
            '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    };
    try {
        const account = await Account.findById(req.params.id);
        const beneficiaries = await Beneficiary.find({ account: account._id });
        res.render('accounts/show', { title: 'Account Details', account, beneficiaries, formatDate });
    } catch (err) {
        console.error(err);
    };
};