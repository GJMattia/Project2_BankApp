const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const accountsCtrl = require('../controllers/accounts');

router.get('/', ensureLoggedIn, accountsCtrl.index);

router.get('/new', ensureLoggedIn, accountsCtrl.newAccount);

router.get('/transfer', ensureLoggedIn, accountsCtrl.transfer);

router.put('/transfer/submit', accountsCtrl.transferCash);

router.get('/:id', ensureLoggedIn, accountsCtrl.show);

router.post('/', accountsCtrl.create);

router.delete('/:id', accountsCtrl.deleteAccount);

router.get('/:id/deposit', accountsCtrl.deposit);

router.put('/:id/deposit/submit', accountsCtrl.depositFunds);

router.get('/:id/withdraw', accountsCtrl.withdraw);

router.put('/:id/withdraw/submit', accountsCtrl.withdrawFunds);



module.exports = router; 