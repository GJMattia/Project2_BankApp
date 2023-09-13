const express = require('express');
const router = express.Router();
const beneficiariesCtrl = require('../controllers/beneficiaries');


router.get('/new/:id', beneficiariesCtrl.new);

router.post('/:id', beneficiariesCtrl.create);

router.delete('/:id', beneficiariesCtrl.delete);


module.exports = router;





