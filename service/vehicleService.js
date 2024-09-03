const axios = require('axios');
const cache = require('../utils/cache');
const Vehicle = require('../models/Vehicle');

const NHTSA_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin';

async function decodeVin(vin) {
  // Check cache first
  const cachedData = await cache.get(vin);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Decode the VIN using the NHTSA API
  const response = await axios.get(`${NHTSA_API_URL}/${vin}?format=json`);
  const result = response.data.Results;

  // Extract the necessary details
  const vehicleData = {
    manufacturer: result.find(item => item.Variable === 'Make').Value,
    model: result.find(item => item.Variable === 'Model').Value,
    year: result.find(item => item.Variable === 'Model Year').Value,
  };

  // Cache the result for future use
  await cache.set(vin, JSON.stringify(vehicleData), 3600); // Cache for 1 hour

  return vehicleData;
}

async function addVehicle(vin, org) {
  const vehicleData = await decodeVin(vin);

  const newVehicle = new Vehicle({
    vin,
    org,
    manufacturer: vehicleData.manufacturer,
    model: vehicleData.model,
    year: vehicleData.year,
  });

  return newVehicle.save();
}

async function getVehicleByVin(vin) {
  return Vehicle.findOne({ vin });
}

module.exports = {
  decodeVin,
  addVehicle,
  getVehicleByVin,
};
