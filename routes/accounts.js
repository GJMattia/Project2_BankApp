const express = require('express');
const router = express.Router();

const accountsCtrl = require('../controllers/accounts');

router.get('/', accountsCtrl.index);

router.get('/new', accountsCtrl.newAccount);

router.get('/transfer', accountsCtrl.transfer);

router.put('/transfer/submit', accountsCtrl.transferCash);

router.get('/:id', accountsCtrl.show);

router.post('/', accountsCtrl.create);

router.delete('/:id', accountsCtrl.deleteAccount);





module.exports = router; 