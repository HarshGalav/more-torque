const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/decode/:vin', vehicleController.decodeVin);
router.post('/', vehicleController.addVehicle);
router.get('/:vin', vehicleController.getVehicle);

module.exports = router;
