const express = require('express');
const router = express.Router();
const beneficiariesCtrl = require('../controllers/beneficiaries');


router.get('/new/:id', beneficiariesCtrl.new);

router.post('/:id', beneficiariesCtrl.create);


module.exports = router;





