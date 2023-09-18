const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const accountsCtrl = require('../controllers/accounts');

router.get('/', ensureLoggedIn, accountsCtrl.index);

router.get('/new', ensureLoggedIn, accountsCtrl.newAccount);

router.get('/transfer', ensureLoggedIn, accountsCtrl.transfer);

router.put('/transfer/submit', ensureLoggedIn, accountsCtrl.transferCash);

router.get('/:id', ensureLoggedIn, accountsCtrl.show);

router.post('/', ensureLoggedIn, accountsCtrl.create);

router.delete('/:id', ensureLoggedIn, accountsCtrl.deleteAccount);

router.get('/:id/deposit', ensureLoggedIn, accountsCtrl.deposit);

router.put('/:id/deposit/submit', ensureLoggedIn, accountsCtrl.depositFunds);

router.get('/:id/withdraw', ensureLoggedIn, accountsCtrl.withdraw);

router.put('/:id/withdraw/submit', ensureLoggedIn, accountsCtrl.withdrawFunds);



module.exports = router; 