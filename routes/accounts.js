const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

const accountsCtrl = require('../controllers/accounts');


router.get('/', accountsCtrl.index);

router.get('/new', accountsCtrl.newAccount);

router.get('/transfer', accountsCtrl.transfer);

router.post('/transfer/submit', accountsCtrl.transferCash);

router.get('/:id', accountsCtrl.show);

router.post('/', accountsCtrl.create);

router.delete('/:id', accountsCtrl.deleteAccount);





module.exports = router; 