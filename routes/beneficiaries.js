const express = require('express');
const router = express.Router();
const beneficiariesCtrl = require('../controllers/beneficiaries');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/:id/update/submit', ensureLoggedIn, beneficiariesCtrl.updateBeneficiary);

router.get('/:id/update', ensureLoggedIn, beneficiariesCtrl.update);

router.get('/new/:id', ensureLoggedIn, beneficiariesCtrl.new);

router.post('/:id', ensureLoggedIn, beneficiariesCtrl.create);

router.delete('/:id', ensureLoggedIn, beneficiariesCtrl.delete);




module.exports = router;





