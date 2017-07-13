const express = require('express');
const vehicleController = require('../controllers/vehicles.controller');

const router = express.Router();

// Routes
router.get('/:id', vehicleController.getVehiclesById);
router.get('/:id/doors', vehicleController.getVehiclesDoorsStatus);
router.get('/:id/fuel', vehicleController.getVehiclesFuelLevel);
router.get('/:id/battery', vehicleController.getVehiclesBatteryLevel);
router.post('/:id/engine', vehicleController.setVehiclesEngineState);

module.exports = router;
