const express = require('express');
const router = express.Router();
const bankAppCtrl = require('../controllers/bankapp');

router.get('/', bankAppCtrl.index);

module.exports = router;