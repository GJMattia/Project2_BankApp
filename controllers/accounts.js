const Account = require('../models/account');
const Beneficiary = require('../models/beneficiary');
const History = require('../models/history');

module.exports = {
    index,
    newAccount,
    create,
    show,
    transfer,
    transferCash,
    deleteAccount,
    withdraw,
    withdrawFunds,
    deposit,
    depositFunds
};

async function deposit(req, res) {
    try {
        const account = await Account.findById(req.params.id);
        res.render('accounts/deposit', { title: 'Deposit Funds', account });
    } catch (err) {
        console.error(err);
    };
};

async function depositFunds(req, res) {
    try {
        const account = await Account.findById(req.params.id);
        const depositAmount = parseFloat(req.body.depositAmount);

        roundedDeposit = parseFloat(depositAmount.toFixed(2));
        account.balance += roundedDeposit;

        await account.save();
        await History.create({
            transactionDate: new Date(),
            transactionDescription: 'Deposit',
            transactionType: 'Credit',
            transactionAmount: req.body.depositAmount,
            account: account._id,
            balance: account.balance
        });
        res.redirect(`/accounts/${account._id}`);
    } catch (err) {
        console.error(err)
    };
};


async function withdrawFunds(req, res) {
    try {
        const account = await Account.findById(req.params.id);
        const withdrawAmount = parseFloat(req.body.withdrawAmount);
        if (account.balance < withdrawAmount) {
            return res.render('accounts/withdraw', {
                title: 'Withdraw Funds',
                account,
                error: 'Error! Insufficient balance!'
            });
        };
        roundedWithdraw = parseFloat(withdrawAmount.toFixed(2));
        account.balance -= withdrawAmount;
        await account.save();
        await History.create({
            transactionDate: new Date(),
            transactionDescription: 'Withdrawal',
            transactionType: 'Debit',
            transactionAmount: req.body.withdrawAmount,
            account: account._id,
            balance: account.balance
        });
        res.redirect(`/accounts/${account._id}`);
    } catch (err) {
        console.error(err)
    };
};

async function withdraw(req, res) {
    try {
        const account = await Account.findById(req.params.id);
        res.render('accounts/withdraw', { title: 'Withdraw Funds', account, error: null });
    } catch (err) {
        console.error(err);
    };
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
        //performs inital operations
        fromAccount.balance -= transferAmount;
        toAccount.balance += transferAmount;
        //Rounds numbers
        fromAccount.balance = parseFloat(fromAccount.balance.toFixed(2));
        toAccount.balance = parseFloat(toAccount.balance.toFixed(2));
        //Updates schema info
        await fromAccount.save();
        await toAccount.save();

        const fromHistory = await History.create({
            transactionDate: new Date(),
            transactionDescription: 'Transfer',
            transactionType: 'Debit',
            transactionAmount: req.body.transferAmount,
            account: fromAccount._id,
            balance: fromAccount.balance
        });

        const toHistory = await History.create({
            transactionDate: new Date(),
            transactionDescription: 'Transfer',
            transactionType: 'Credit',
            transactionAmount: req.body.transferAmount,
            account: toAccount._id,
            balance: toAccount.balance
        });

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
        const account = await Account.create(req.body);

        await History.create({
            transactionDate: new Date(),
            transactionDescription: 'Opening Balance',
            transactionType: 'Credit',
            transactionAmount: req.body.balance,
            account: account._id,
            balance: req.body.balance
        });

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
        const history = await History.find({ account: account._id });
        res.render('accounts/show', { title: 'Account Details', account, beneficiaries, formatDate, history });
    } catch (err) {
        console.error(err);
    };
};