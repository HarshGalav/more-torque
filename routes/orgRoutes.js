const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

router.post('/', orgController.createOrg);
router.patch('/', orgController.updateOrg);
router.get('/', orgController.getAllOrgs);

module.exports = router;
