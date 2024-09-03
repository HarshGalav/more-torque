const vehicleService = require('../services/vehicleService');

exports.decodeVin = async (req, res) => {
  try {
    const { vin } = req.params;
    const vehicleDetails = await vehicleService.decodeVin(vin);
    res.status(200).json(vehicleDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const { vin, org } = req.body;
    const newVehicle = await vehicleService.addVehicle(vin, org);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const { vin } = req.params;
    const vehicle = await vehicleService.getVehicle(vin);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
