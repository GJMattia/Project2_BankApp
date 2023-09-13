const express = require('express');
const router = express.Router();

const accountsCtrl = require('../controllers/accounts');

router.get('/', accountsCtrl.index);

router.get('/new', accountsCtrl.newAccount);

router.get('/:id', accountsCtrl.show);

router.post('/', accountsCtrl.create);


module.exports = router; 